import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { title } from 'process';
import { query } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(@Query('bgColor') bgColor: string = 'aqua') {
    return {
      bgColor: bgColor,
      message: this.appService.getHello()
    };
  }

  #books = [
    {
      title: "The lord",
      isbn: '1'
    },
    {
      title: "The art",
      isbn: '2'
    },
    {
      title: "The ball",
      isbn: '3'
    },
  ]

  @Get('booklist')
  @Render('books')
  getBooks() {
    return {
      books: this.#books
    }
  }

  @Get('books')
  @Render('booklist')
  getAllBooks(@Query('title') title: string) {
    return {
    };
  }

  @Get('books/:isbn')
  @Render('book')
  getBookByIsbn(@Param('isbn') isbn: string) {
    return this.#books.find(
      b => b.isbn == isbn
    )
  }
}
