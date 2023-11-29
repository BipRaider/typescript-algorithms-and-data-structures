export enum ImageFormat {
  Jpg = 'jpg',
  Png = 'png',
}
export interface Resolution {
  wight: number;
  height: number;
}
export interface Conversion extends Resolution {
  format: ImageFormat;
}

interface IBuilder<T> {
  formats: ImageFormat[];
  build: () => Conversion[];
  addJpg: () => T;
  addPng: () => T;
  addResolution: (wight: number, height: number) => T;
}

export default class Builder implements IBuilder<Builder> {
  public formats: ImageFormat[] = [];
  public resolution: Resolution[] = [];

  public addJpg = (): Builder => {
    if (this.formats.includes(ImageFormat.Jpg)) {
      return this;
    }
    this.formats.push(ImageFormat.Jpg);
    return this;
  };

  public addPng = (): Builder => {
    if (this.formats.includes(ImageFormat.Png)) {
      return this;
    }
    this.formats.push(ImageFormat.Png);
    return this;
  };

  public addResolution = (wight: number, height: number): Builder => {
    this.resolution.push({ wight, height });
    return this;
  };

  public build(): Conversion[] {
    const res: Conversion[] = [];

    for (const f of this.formats) {
      for (const r of this.resolution) {
        res.push({
          format: f,
          wight: r.wight,
          height: r.height,
        });
      }
    }

    return res;
  }
}

console.dir(
  new Builder().addJpg().addPng().addResolution(550, 10).addResolution(100, 50).addResolution(200, 300).build(),
);
