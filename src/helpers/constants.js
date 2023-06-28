export const operations = {
  logic: {
    and: {
      sign: "&&",
      str: "AND",
    },
    or: {
      sign: "||",
      str: "OR",
    },
  },
  compare: {
    eq: {
      sign: "=",
      str: "is equal to",
    },
    not: {
      sign: "!=",
      str: "is not equal to",
    },
    qt: {
      sign: ">",
      str: "is more then",
    },
    gte: {
      sign: ">=",
      str: "is more or equal to",
    },
    lt: {
      sign: "<",
      str: "is less then",
    },
    lte: {
      sign: "<=",
      str: "is less or equal to",
    },
  },
  math: {
    bor: "|",
    band: "&",
    plus: "+",
    minus: "-",
    div: "/",
    mul: "*",
    mod: "%",
  },
};

export const actions = ["set", "call", "obj", "const"];

export const types = ["obj", "string", "integer", "float", "bool"];
