export type SubList = (string | undefined)[];

export type CoinData = {
  CoinInfo: CoinInfo;
  RAW: {
    USD?: RawData;
  };
  DISPLAY: {
    USD?: DisplayData;
  };
  WS_DATA?: WSData;
};

export type CoinInfoFetch = {
  Data: CoinData[];
};

export type CoinAsset = AssetData;

export type Price = {
  Response: "Error" | undefined;
  RAW: {
    [c: string]: {
      USD: RawData;
    };
  };
  DISPLAY: {
    [c: string]: {
      USD: DisplayData;
    };
  };
};

type CoinInfo = {
  Id: string;
  Name: string;
  FullName: string;
  Internal: string;
  ImageUrl: string;
  Url: string;
  Algorithm: string;
  ProofType: string;
  Rating: {
    Weiss: {
      Rating: string;
      TechnologyAdoptionRating: string;
      MarketPerformanceRating: string;
    };
  };
  NetHashesPerSecond: number;
  BlockNumber: number;
  BlockTime: number;
  BlockReward: number;
  AssetLaunchDate: string;
  MaxSupply: number;
  Type: number;
  DocumentType: string;
};

type RawData = {
  TYPE: string;
  MARKET: string;
  FROMSYMBOL: string;
  TOSYMBOL: string;
  FLAGS: string;
  LASTMARKET: string;
  MEDIAN: number;
  TOPTIERVOLUME24HOUR: number;
  TOPTIERVOLUME24HOURTO: number;
  LASTTRADEID: string;
  PRICE: number;
  LASTUPDATE: number;
  LASTVOLUME: number;
  LASTVOLUMETO: number;
  VOLUMEHOUR: number;
  VOLUMEHOURTO: number;
  OPENHOUR: number;
  HIGHHOUR: number;
  LOWHOUR: number;
  VOLUMEDAY: number;
  VOLUMEDAYTO: number;
  OPENDAY: number;
  HIGHDAY: number;
  LOWDAY: number;
  VOLUME24HOUR: number;
  VOLUME24HOURTO: number;
  OPEN24HOUR: number;
  HIGH24HOUR: number;
  LOW24HOUR: number;
  CHANGE24HOUR: number;
  CHANGEPCT24HOUR: number;
  CHANGEDAY: number;
  CHANGEPCTDAY: number;
  CHANGEHOUR: number;
  CHANGEPCTHOUR: number;
  CONVERSIONTYPE: string;
  CONVERSIONSYMBOL: string;
  CONVERSIONLASTUPDATE: number;
  SUPPLY: number;
  MKTCAP: number;
  MKTCAPPENALTY: number;
  CIRCULATINGSUPPLY: number;
  CIRCULATINGSUPPLYMKTCAP: number;
  TOTALVOLUME24H: number;
  TOTALVOLUME24HTO: number;
  TOTALTOPTIERVOLUME24H: number;
  TOTALTOPTIERVOLUME24HTO: number;
  IMAGEURL: string;
};

export type DisplayData = {
  FROMSYMBOL: string;
  TOSYMBOL: string;
  MARKET: string;
  LASTMARKET: string;
  TOPTIERVOLUME24HOUR: string;
  TOPTIERVOLUME24HOURTO: string;
  LASTTRADEID: string;
  PRICE: string;
  LASTUPDATE: string;
  LASTVOLUME: string;
  LASTVOLUMETO: string;
  VOLUMEHOUR: string;
  VOLUMEHOURTO: string;
  OPENHOUR: string;
  HIGHHOUR: string;
  LOWHOUR: string;
  VOLUMEDAY: string;
  VOLUMEDAYTO: string;
  OPENDAY: string;
  HIGHDAY: string;
  LOWDAY: string;
  VOLUME24HOUR: string;
  VOLUME24HOURTO: string;
  OPEN24HOUR: string;
  HIGH24HOUR: string;
  LOW24HOUR: string;
  CHANGE24HOUR: string;
  CHANGEPCT24HOUR: string;
  CHANGEDAY: string;
  CHANGEPCTDAY: string;
  CHANGEHOUR: string;
  CHANGEPCTHOUR: string;
  CONVERSIONTYPE: string;
  CONVERSIONSYMBOL: string;
  CONVERSIONLASTUPDATE: string;
  SUPPLY: string;
  MKTCAP: string;
  MKTCAPPENALTY: string;
  CIRCULATINGSUPPLY: string;
  CIRCULATINGSUPPLYMKTCAP: string;
  TOTALVOLUME24H: string;
  TOTALVOLUME24HTO: string;
  TOTALTOPTIERVOLUME24H: string;
  TOTALTOPTIERVOLUME24HTO: string;
  IMAGEURL: string;
};

type WSData = {
  TYPE: string;
  MARKET: string;
  FROMSYMBOL: string;
  TOSYMBOL: string;
  FLAGS: 2;
  MEDIAN: number;
  LASTTRADEID: string;
  PRICE: number;
  LASTUPDATE: number;
  LASTVOLUME: number;
  LASTVOLUMETO: number;
  VOLUMEHOUR: number;
  VOLUMEHOURTO: number;
  VOLUMEDAY: number;
  VOLUMEDAYTO: number;
  VOLUME24HOUR: number;
  VOLUME24HOURTO: number;
  CURRENTSUPPLYMKTCAP: number;
  CIRCULATINGSUPPLYMKTCAP: number;
  MAXSUPPLYMKTCAP: number;
};

type AssetData = {
  ID: number;
  TYPE: string;
  ID_PARENT_ASSET: null | number;
  SYMBOL: string;
  URI: string;
  ASSET_TYPE: string;
  PARENT_ASSET_SYMBOL: null | string;
  CREATED_ON: number;
  UPDATED_ON: number;
  NAME: string;
  LOGO_URL: string;
  ASSET_DESCRIPTION_SNIPPET: string;
  PUBLIC_NOTICE: null;
  LAUNCH_DATE: number;
  ASSET_ALTERNATIVE_IDS: {
    NAME: string;
    ID: string;
  }[];
  ASSET_DECIMAL_POINTS: number;
  SUPPORTED_PLATFORMS: {
    BLOCKCHAIN?: string;
    TOKEN_STANDARD?: string;
    BRIDGE_OPERATOR: string;
    IS_ASSET_ISSUER: boolean;
    EXPLORER_URL: string;
    SMART_CONTRACT_ADDRESS: string;
    LAUNCH_DATE: number;
    TRADING_AS: string;
    DECIMALS?: number;
    IS_INHERITED: boolean;
    RETIRE_DATE?: number;
  }[];
  ASSET_CUSTODIANS: { NAME: string }[];
  SUPPLY_MAX: number;
  SUPPLY_ISSUED: number;
  SUPPLY_TOTAL: number;
  SUPPLY_CIRCULATING: number;
  SUPPLY_FUTURE: number;
  SUPPLY_LOCKED: number;
  SUPPLY_BURNT: number;
  SUPPLY_STAKED: number;
  LAST_BLOCK_MINT: number;
  LAST_BLOCK_BURN: null;
  BURN_ADDRESSES: null;
  LOCKED_ADDRESSES: null;
  HAS_SMART_CONTRACT_CAPABILITIES: number;
  TARGET_BLOCK_MINT: number;
  TARGET_BLOCK_TIME: number;
  LAST_BLOCK_NUMBER: number;
  LAST_BLOCK_TIMESTAMP: number;
  LAST_BLOCK_TIME: number;
  LAST_BLOCK_SIZE: null;
  LAST_BLOCK_ISSUER: null;
  LAST_BLOCK_TRANSACTION_FEE_TOTAL: null;
  LAST_BLOCK_TRANSACTION_COUNT: null;
  LAST_BLOCK_HASHES_PER_SECOND: number;
  LAST_BLOCK_DIFFICULTY: number;
  LAYER_TWO_SOLUTIONS: {
    NAME: string;
    DESCRIPTION?: string;
    CATEGORY: string;
    WEBSITE_URL?: string;
  }[];
  PRIVACY_SOLUTIONS: null;
  CODE_REPOSITORIES: {
    URL: string;
    MAKE_3RD_PARTY_REQUEST: boolean;
    OPEN_ISSUES: number;
    CLOSED_ISSUES: number;
    OPEN_PULL_REQUESTS: number;
    CLOSED_PULL_REQUESTS: number;
    CONTRIBUTORS: number;
    FORKS: number;
    STARS: number;
    SUBSCRIBERS: number;
    LAST_UPDATED_TS: number;
    CREATED_AT: number;
    UPDATED_AT: number;
    LAST_PUSH_TS: number;
    CODE_SIZE_IN_BYTES: number;
    IS_FORK: boolean;
    LANGUAGE: string;
    FORKED_ASSET_DATA: null;
  }[];
  SUBREDDITS: {
    URL: string;
    MAKE_3RD_PARTY_REQUEST: boolean;
    NAME: string;
    CURRENT_ACTIVE_USERS: number;
    AVERAGE_POSTS_PER_DAY: number;
    AVERAGE_POSTS_PER_HOUR: number;
    AVERAGE_COMMENTS_PER_DAY: number;
    AVERAGE_COMMENTS_PER_HOUR: number;
    SUBSCRIBERS: number;
    COMMUNITY_CREATED_AT: number;
    LAST_UPDATED_TS: number;
  }[];
  TWITTER_ACCOUNTS: {
    URL: string;
    MAKE_3RD_PARTY_REQUEST: boolean;
    NAME: string;
    USERNAME: string;
    VERIFIED: boolean;
    VERIFIED_TYPE: string;
    FOLLOWING: number;
    FOLLOWERS: number;
    FAVOURITES: number;
    LISTS: number;
    STATUSES: number;
    ACCOUNT_CREATED_AT: number;
    LAST_UPDATED_TS: number;
  }[];
  DISCORD_SERVERS: null;
  TELEGRAM_GROUPS: null;
  OTHER_SOCIAL_NETWORKS: {
    NAME: string;
    URL: string;
  }[];
  HELD_TOKEN_SALE: number;
  HELD_EQUITY_SALE: number;
  WEBSITE_URL: string;
  BLOG_URL: null;
  WHITE_PAPER_URL: string;
  OTHER_DOCUMENT_URLS: null;
  EXPLORER_ADDRESSES: { URL: string }[];
  ASSET_INDUSTRIES: { ASSET_INDUSTRY: string }[];
  CONSENSUS_MECHANISMS: { NAME: string }[];
  CONSENSUS_ALGORITHM_TYPES: {
    NAME: string;
    DESCRIPTION: string;
  }[];
  HASHING_ALGORITHM_TYPES: { NAME: string }[];
  PRICE_USD: number;
  PRICE_USD_SOURCE: string;
  PRICE_USD_LAST_UPDATE_TS: number;
  MKT_CAP_PENALTY: null;
  CIRCULATING_MKT_CAP_USD: number;
  TOTAL_MKT_CAP_USD: number;
  SPOT_MOVING_24_HOUR_QUOTE_VOLUME_TOP_TIER_DIRECT_USD: number;
  SPOT_MOVING_24_HOUR_QUOTE_VOLUME_DIRECT_USD: number;
  SPOT_MOVING_24_HOUR_QUOTE_VOLUME_TOP_TIER_USD: number;
  SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD: number;
  SPOT_MOVING_24_HOUR_CHANGE_USD: number;
  SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD: number;
  TOPLIST_BASE_RANK: {
    LAUNCH_DATE: number;
    CIRCULATING_MKT_CAP_USD: number;
    TOTAL_MKT_CAP_USD: number;
    SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD: number;
    SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD: number;
  };
  ASSET_DESCRIPTION: string;
  ASSET_DESCRIPTION_SUMMARY: string;
  PROJECT_LEADERS: {
    LEADER_TYPE: string;
    FULL_NAME: string;
  }[];
  ASSOCIATED_CONTACT_DETAILS: {
    CONTACT_MEDIUM: string;
    FULL_NAME: string;
  }[];
  SEO_TITLE: string;
  SEO_DESCRIPTION: string;
};
