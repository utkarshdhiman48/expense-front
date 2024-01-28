function getColorFromString(
  string: string,
  options?: {
    gradient?: boolean;
    saturation?: number;
    lightness?: number;
    degree?: number;
  }
) {
  let hash = 0;

  if (string) for (const char of string) hash = hash * 31 + char.charCodeAt(0);

  const color1 = `hsl(${hash % 360}, ${options?.saturation ?? 80}%, ${
    options?.lightness ?? 80
  }%)`;
  const color2 = `hsl(${(hash + 20) % 360}, ${
    (options?.saturation ?? 80) - 20
  }%, ${(options?.lightness ?? 80) - 20}%)`;

  if (!options?.gradient) return color1;

  return `linear-gradient(${
    options?.degree ?? 225
  }deg, ${color1} 40%, ${color2})`;
}

export default getColorFromString;
