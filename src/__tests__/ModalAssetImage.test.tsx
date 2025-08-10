import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ModalAssetImage } from '@/features/details/ui/ModalAssetImage';

describe('ModalAssetImage', () => {
  it('renders image and title correctly', () => {
    const testSrc = 'https://test.com/saturn.jpg';
    const testTitle = 'saturn';

    render(<ModalAssetImage imageSrc={testSrc} imageTitle={testTitle} />);

    const img = screen.getByAltText(testTitle);
    const caption = screen.getByText(testTitle);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', testSrc);
    expect(caption).toBeInTheDocument();
  });
});
