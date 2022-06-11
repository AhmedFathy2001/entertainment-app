export class Show {
  id: number;
  title: string;
  thumbnail: Thumbnail;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;

  constructor(
    id: number,
    title: string,
    thumbnail: Thumbnail,
    year: number,
    category: string,
    rating: string,
    isBookmarked: boolean,
    isTrending: boolean
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.year = year;
    this.category = category;
    this.rating = rating;
    this.isBookmarked = isBookmarked;
    this.isTrending = isTrending;
  }
}

export class Thumbnail {
  regular?: Regular;
  trending?: Trending;
  constructor(regular: Regular, trending: Trending) {
    this.regular = regular;
    this.trending = trending;
  }
}

export class Regular {
  small: string;
  medium: string;
  large: string;
  constructor(small: string, medium: string, large: string) {
    this.small = small;
    this.medium = medium;
    this.large = large;
  }
}

export class Trending {
  small: string;
  large: string;
  constructor(small: string, large: string) {
    this.small = small;
    this.large = large;
  }
}
