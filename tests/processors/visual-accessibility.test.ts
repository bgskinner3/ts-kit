/**
 * @jest-environment jsdom
 */
import { A11yContrastAuditor } from '../../src/lib/processors/visual';

describe('A11yContrastAuditor', () => {
  const BLACK = '#000000';
  const WHITE = '#ffffff';

  describe('initialize & palette resolution', () => {
    it('should resolve colors from the default seed palette', () => {
      const report = A11yContrastAuditor.audit('white', 'black');
      expect(report.ratio).toBeGreaterThan(20);
    });

    it('should merge and resolve new project colors after initialization', () => {
      A11yContrastAuditor.initialize({ 'brand-primary': '#0055ff' });
      const report = A11yContrastAuditor.audit('white', 'brand-primary');
      // Verify it didn't return 0 (fallback), but used the blue hex
      expect(report.ratio).toBeGreaterThan(1);
      expect(report.ratio).not.toBe(21);
    });

    it('should warn and fallback to 0 luminance for invalid color formats', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const report = A11yContrastAuditor.audit('invalid-color', 'black');

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Cannot process'),
      );
      expect(report.ratio).toBe(1); // Ratio of black (0) to black (0) + 0.05 offset
      warnSpy.mockRestore();
    });
  });

  describe('audit logic (WCAG compliance)', () => {
    it('should return PASS status for high contrast ratios (AA and AAA)', () => {
      const report = A11yContrastAuditor.audit(WHITE, BLACK);
      expect(report.status).toBe('PASS');
      expect(report.isAA).toBe(true);
      expect(report.isAAA).toBe(true);
    });

    it('should return LARGE_TEXT_ONLY for ratios between 3.0 and 4.5', () => {
      // #767676 on white is approx 4.5:1. Let's use a slightly lighter gray.
      const report = A11yContrastAuditor.audit('#949494', WHITE);
      expect(report.isAA).toBe(false);
      expect(report.isAALargeText).toBe(true);
      expect(report.status).toBe('LARGE_TEXT_ONLY');
    });

    it('should return FAIL for ratios below 3.0', () => {
      // gray-700 (#374151) on black (#000000) is approx 2.0:1
      const report = A11yContrastAuditor.audit('#374151', '#000000');

      expect(report.ratio).toBeLessThan(3.0);
      expect(report.isAA).toBe(false);
      expect(report.isAALargeText).toBe(false);
      expect(report.status).toBe('FAIL');
    });

    it('should correctly parse and audit rgb() strings from the browser', () => {
      const report = A11yContrastAuditor.audit(
        'rgb(255, 255, 255)',
        'rgb(0, 0, 0)',
      );
      expect(report.ratio).toBeCloseTo(21);
    });
  });

  describe('fix & discovery logic', () => {
    it('should getFamily members based on prefix', () => {
      A11yContrastAuditor.initialize({
        'test-100': '#eee',
        'test-200': '#ccc',
      });
      const family = A11yContrastAuditor.getFamily('test');
      expect(family).toContain('test-100');
      expect(family).toContain('test-200');
    });

    it('should findBestColor using proximity sorting (closest luminance)', () => {
      const candidates = ['#111111', '#444444', '#999999'];
      // Testing against white background.
      // #999999 is too light. Both #444 and #111 pass.
      // #444444 is "closer" to the original background (#555) than #111.
      const best = A11yContrastAuditor.findBestColor(
        WHITE,
        '#555555',
        candidates,
      );
      expect(best).toBe('#444444');
    });

    it('should return only failures in auditPalette', () => {
      const failures = A11yContrastAuditor.auditPalette(WHITE, [
        BLACK,
        WHITE,
        '#cccccc',
      ]);
      // white on white is a failure. #ccc on white is a failure.
      expect(failures.length).toBe(2);
      expect(failures[0].color).toBe(WHITE);
    });
  });

  describe('DOM Auditing (auditElement)', () => {
    it('should traverse up to find an effective background through transparent layers', () => {
      // 1. Create elements programmatically
      const grandparent = document.createElement('div');
      const parent = document.createElement('div');
      const child = document.createElement('span');

      // 2. Set styles explicitly
      grandparent.style.backgroundColor = 'rgb(0, 0, 0)';
      parent.style.backgroundColor = 'transparent';
      child.style.color = 'rgb(255, 255, 255)';

      // 3. Construct the tree
      parent.appendChild(child);
      grandparent.appendChild(parent);
      document.body.appendChild(grandparent); // Append to live DOM

      const report = A11yContrastAuditor.auditElement(child);

      expect(report.colors.background.hex).toBe('rgb(0, 0, 0)');
      expect(report.ratio).toBeGreaterThan(15);

      document.body.removeChild(grandparent); // Clean up
    });

    it('should handle modern transparency syntax', () => {
      const bg = document.createElement('div');
      const overlay = document.createElement('div');
      const target = document.createElement('span');

      bg.style.backgroundColor = 'rgb(0, 0, 0)';
      // JSDOM usually converts this to rgba(255, 255, 255, 0.5)
      overlay.style.backgroundColor = 'rgba(255, 255, 255, 0)';
      target.style.color = 'rgb(0, 0, 0)';

      overlay.appendChild(target);
      bg.appendChild(overlay);
      document.body.appendChild(bg);

      const report = A11yContrastAuditor.auditElement(target);

      // Should skip the '0' alpha overlay and see the black background
      expect(report.colors.background.hex).toBe('rgb(0, 0, 0)');

      document.body.removeChild(bg);
    });
  });
  describe('Edge cases', () => {
    it('should fallback to white if no background is found up to the document root', () => {
      const orphan = document.createElement('div');
      // Do not append to body
      const report = A11yContrastAuditor.auditElement(orphan);

      expect(report.colors.background.hex).toBe('#ffffff');
      expect(report.status).toBeDefined();
    });

    it('should correctly ignore the alpha channel in rgba strings', () => {
      // rgba(255, 255, 255, 0.1) should be treated as pure white (1.0 luminance)
      // because our auditor finds the "effective" solid background behind it.
      const report = A11yContrastAuditor.audit(
        'rgba(255, 255, 255, 0.1)',
        '#000000',
      );

      expect(report.ratio).toBeGreaterThan(20);
      expect(report.colors.foreground.hex).toBe('rgba(255, 255, 255, 0.1)');
    });

    it('should use the default seed palette if no project colors are initialized', () => {
      // Even if we didn't add 'gray-900' to a custom palette,
      // the seed should provide it.
      const report = A11yContrastAuditor.audit('white', 'gray-900');
      expect(report.ratio).toBeGreaterThan(10);
    });

    it('should pick the closest passing shade, not just the first one that passes', () => {
      const fg = '#ffffff'; // White
      const bg = '#93c5fd'; // Light blue (fails)

      // Both #1e3a8a (very dark) and #2563eb (medium) pass.
      // #2563eb is closer to the original #93c5fd.
      const candidates = ['#1e3a8a', '#2563eb'];
      const best = A11yContrastAuditor.findBestColor(fg, bg, candidates);

      expect(best).toBe('#2563eb');
    });
  });
});
