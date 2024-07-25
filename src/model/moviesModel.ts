import mongoose, { Schema, Model } from "mongoose";

interface MoviesObject {
  _id: Schema.Types.ObjectId;
  plot: string;
  genres: string[];
  runtime: number; // in minutes
  cast: string[];
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: {
    $date: {
      $numberLong: string; // millis string
    };
  };
  directors: string[];
  rated: string;
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: string; // time instance
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  countries: string[];
  type: string;
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    fresh: number;
    critic: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    rotten: number;
    lastUpdated: {
      $date: string; // time instance
    };
  };
  num_mflix_comments: number;
}

const MoviesObjectSchema: Schema<MoviesObject> = new Schema({
  plot: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fullplot: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  directors: {
    type: [String],
    required: true,
  },
  released: {
    $date: {
      $numberLong: { type: String, required: true }, // millis string
    },
  },
  rated: {
    type: String,
    required: true,
  },
  awards: {
    type: {
      wins: { type: Number, required: true },
      nominations: { type: Number, required: true },
      text: { type: String, required: true },
    },
    required: true,
  },
  lastupdated: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  imdb: {
    type: {
      rating: { type: Number, required: true },
      votes: { type: Number, required: true },
      id: { type: Number, required: true },
    },
    required: true,
  },
  countries: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  tomatoes: {
    type: {
      viewer: {
        rating: Number,
        numReviews: Number,
        meter: Number,
      },
      fresh: Number,
      critic: {
        rating: Number,
        numReviews: Number,
        meter: Number,
      },
      rotten: Number,
      lastUpdated: {
        $date: String, // time instance
      },
    },
    required: true,
  },
  num_mflix_comments: {
    type: Number,
    required: true,
  },
});

const Movies: Model<MoviesObject> = mongoose.model<MoviesObject>(
  "Movies",
  MoviesObjectSchema,
  "movies"
);

export { Movies };

// {
//   _id: ObjectId;
//   plot: "A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.";
//   genres: ["Short", "Western"];
//   runtime: 11;
//   cast: [
//     "A.C. Abadie",
//     "Gilbert M. 'Broncho Billy' Anderson",
//     "George Barnes",
//     "Justus D. Barnes",
//   ];
//   poster: "https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg";
//   title: "The Great Train Robbery";
//   fullplot: "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.";
//   languages: ["English"];
//   released: {
//     $date: {
//       $numberLong: "-2085523200000";
//     }
//   }
//   directors: ["Edwin S. Porter"];
//   rated: "TV-G";
//   awards: {
//     wins: 1;
//     nominations: 0;
//     text: "1 win.";
//   }
//   lastupdated: "2015-08-13 00:27:59.177000000";
//   year: 1903;
//   imdb: {
//     rating: 7.4;
//     votes: 9847;
//     id: 439;
//   }
//   countries: ["USA"];
//   type: "movie";
//   tomatoes: {
//     viewer: {
//       rating: 3.7;
//       numReviews: 2559;
//       meter: 75;
//     }
//     fresh: 6;
//     critic: {
//       rating: 7.6;
//       numReviews: 6;
//       meter: 100;
//     }
//     rotten: 0;
//     lastUpdated: {
//       $date: "2015-08-08T19:16:10.000Z";
//     }
//   }
//   num_mflix_comments: 0;
// }
