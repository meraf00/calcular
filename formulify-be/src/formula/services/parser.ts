export enum TokenType {
  EOF = 'EOF',
  IDENT = 'IDENT',
  NUMBER = 'NUMBER',
  PLUS = '+',
  MINUS = '-',
  ASTERISK = '*',
  LPAREN = '(',
  RPAREN = ')',
}

export class Token {
  constructor(
    public type: TokenType,
    public literal: string,
  ) {}
}

export class Lexer {
  private position: number; // current position
  private readPosition: number; // next position to read
  private currentChar: string;

  constructor(private expression: string) {
    this.position = -1;
    this.readPosition = 0;
    this.currentChar = '';
    this.readChar();
  }

  peekChar() {
    if (this.readPosition >= this.expression.length) {
      return '';
    } else {
      return this.expression[this.readPosition];
    }
  }

  readChar() {
    if (this.readPosition >= this.expression.length) {
      this.currentChar = '';
    } else {
      this.currentChar = this.expression[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }

  skipWhitespace() {
    while (this.currentChar === ' ') {
      this.readChar();
    }
  }

  readIdentifier() {
    const position = this.position;

    if (this.currentChar.match(/[_a-zA-Z]/)) {
      this.readChar();
    }

    while (this.currentChar.match(/[_a-zA-Z0-9]/)) {
      this.readChar();
    }

    return new Token(
      TokenType.IDENT,
      this.expression.slice(position, this.position),
    );
  }

  readNumber() {
    const position = this.position;
    while (this.currentChar.match(/[0-9]/)) {
      this.readChar();
    }

    if (this.currentChar == '.') {
      this.readChar();

      while (this.currentChar.match(/[0-9]/)) {
        this.readChar();
      }
    }

    return new Token(
      TokenType.NUMBER,
      this.expression.slice(position, this.position),
    );
  }

  nextToken() {
    let token: Token;

    this.skipWhitespace();

    switch (this.currentChar) {
      case '+':
        token = new Token(TokenType.PLUS, this.currentChar);
        break;
      case '-':
        token = new Token(TokenType.MINUS, this.currentChar);
        break;
      case '*':
        token = new Token(TokenType.ASTERISK, this.currentChar);
        break;
      case '(':
        token = new Token(TokenType.LPAREN, this.currentChar);
        break;
      case ')':
        token = new Token(TokenType.RPAREN, this.currentChar);
        break;
      default:
        if (this.currentChar === '') {
          return new Token(TokenType.EOF, this.currentChar);
        } else if (this.currentChar.match(/[_a-zA-Z]/)) {
          return this.readIdentifier();
        } else if (this.currentChar.match(/[0-9]/)) {
          return this.readNumber();
        } else {
          throw new Error(`Invalid character: ${this.currentChar}`);
        }
    }

    this.readChar();

    return token;
  }
}
