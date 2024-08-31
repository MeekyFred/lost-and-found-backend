import { Controller, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Body, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

/**
 * Controller for users
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Route for handling create user request
   * @param createUserDto A DTO used to validate incoming POST request
   * @example HTTP POST /user
   * @returns response
   */
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBody({
    required: true,
    type: CreateUserDto,
    description: 'User creation details',
  })
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Route for handling get users request
   * @param getUsersQueryDto A DTO used to validate incoming GET request queries
   * @example HTTP GET /users
   * @returns User[]
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  @ApiQuery({
    name: 'getUsersQueryDto',
    required: false,
    type: GetUsersQueryDto,
    description: 'User Query DTO',
    example: { page: 1, limit: 10 },
  })
  public getUsers(@Query() getUsersQueryDto: GetUsersQueryDto) {
    return this.usersService.findAll(getUsersQueryDto);
  }

  /**
   * Route for handling patch user request
   * @param patchUserDto A DTO used to validate incoming PATCH request
   * @example HTTP PATCH /user
   * @returns response
   */
  @Patch()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiBody({
    required: true,
    type: PatchUserDto,
    description: 'User update details',
  })
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }

  /**
   * Route for handling delete user request
   * @param id number describing the ID of user
   * @example HTTP DELETE /user/1
   * @returns response
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'User ID',
    example: 1,
  })
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
}
