import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, createUserSchema } from './dto/user-create.dto';
import { UpdateUserDto, updateUserSchema } from './dto/user-update.dto';
import {
  ResetPasswordDto,
  resetPasswordSchema,
} from './dto/reset-password.dto';
import {
  UpdatePasswordDto,
  updatePasswordSchema,
} from './dto/update-password.dto';
import { UserLoginDto, userLoginSchema } from './dto/user-login.dto';
import {
  CreateTenantDto,
  createTenantSchema,
} from 'src/modules/tenants/dto/tenant-create.dto';
import { TenantService } from 'src/modules/tenants/tenants.service';
import { CustomValidationPipe } from 'src/common/pipes/validation.pipe';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { ApiKeyGuard } from 'src/common/guards/apikey.guard';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private tenantService: TenantService,
  ) { }

  /**
   * POST     /users/create
   * [userCreate]
   * - insert user
   * - send 400 if error
   * - send 201 with data
   */

  @Post()
  @UseGuards(ApiKeyGuard)
  @UsePipes(new CustomValidationPipe(createUserSchema))
  async create(@Body() params: CreateUserDto) {
    const results = await this.userService.userCreate(params);
    if (!results.success) {
      throw new HttpException(results, results.statusCode);
    }

    return results;
  }

  /**
   * POST     /users/verify
   * [userVerify]
   * - get user by id
   * - send 404 if not found
   * - set user enable
   * - update user resource
   * - send 400 if failed
   * - send 200 with data
   */
  @Post('/:id/verify')
  @HttpCode(200)
  @UseGuards(new PermissionsGuard(null, { path: 'id', sub: 'sub' }))
  async verify(@Param('id', ParseIntPipe) id: number) {
    const results = await this.userService.userVerify(id);
    if (!results.success) {
      throw new HttpException(results, results.statusCode);
    }

    return results;
  }

  /**
   * POST     /users/reset-password
   * [userResetPassword]
   * - get user by email
   * - send 404 if user not found
   * - set user temporary password
   * - create verification token
   * - send token via email
   * - send 200
   */
  @Post('/reset-password')
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe(resetPasswordSchema))
  async resetPassword(@Body() params: ResetPasswordDto) {
    const results = await this.userService.userResetPassword(params);
    if (!results.success) {
      throw new HttpException(results, results.statusCode);
    }

    return results;
  }

  /**
   * POST     /users/set-password
   * [userSetPassword]
   * - get user by id
   * - send 404 if not found
   * - set user password from temp password
   * - update user resource
   * - send 400 if faild
   * - send 200 with data
   */
  @Post('/:id/set-password')
  setPassword(@Param('id', ParseIntPipe) id: number) {
    return this.userService.userSetPassword(id);
  }

  /**
   * PUT     /users/:id/password
   * user-password-change & sub=:id
   * [userUpdatePassword]
   * - get user by id
   * - send 404 if failed
   * - check old password is correct
   * - send 401 if not
   * - set password with new password
   * - update user resource
   * - send 400 if failed
   * - send 200
   */
  @Put('/:id/password')
  @UseGuards(
    new PermissionsGuard(['user-password-change'], { path: 'id', sub: 'sub' }),
  )
  updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body(new CustomValidationPipe(updatePasswordSchema))
    params: UpdatePasswordDto,
  ) {
    return this.userService.userUpdatePassword(id, params);
  }

  /**
   * PUT     /users/:id
   * user-change & sub=:id
   * [userUpdate]
   * - get user by id
   * - send 404 if not found
   * - set new user params
   * - update user resource
   * - send 400 if failed
   * - send 200 with data
   */
  @Put('/:id')
  @UseGuards(
    new PermissionsGuard(['user-change', '*'], { path: 'id', sub: 'sub' }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new CustomValidationPipe(updateUserSchema)) params: UpdateUserDto,
  ) {
    return this.userService.userUpdate(id, params);
  }

  /**
   * GET     /users/:id
   * sub=:id
   * [userGet]
   * - find user by id
   * - send 404 if not found
   * - send 200 with data
   */
  @Get('/:id')
  @UseGuards(new PermissionsGuard(null, { sub: 'sub', path: 'id' }))
  get(@Param('id', ParseIntPipe) id: number) {
    return this.userService.userGet(id);
  }

  /**
   * POST     /users/login
   * [userLogin]
   * - get user by email
   * - send 404 if not found
   * - match password
   * - send 401 if not matched
   * - generate user token
   * - prepare data
   * - send 200 with data
   */
  @Post('/login')
  @UsePipes(new CustomValidationPipe(userLoginSchema))
  login(@Body() params: UserLoginDto) {
    return this.userService.userLogin(params);
  }

  /**
   * GET     /users/:id/tenants
   * user-tenant-read & sub=:id
   * [getUserTenants]
   * - get user tenants
   * - send 404 if not found
   * - prepare data
   * - send 200 with data
   */
  @Get('/:id/tenants')
  @UseGuards(new PermissionsGuard(['user-tenant-read'], { sub: 'id' }))
  getTenants(@Param('id', ParseIntPipe) id: number) {
    return this.tenantService.getUserTenants(id);
  }

  /**
   * POST     /users/:id/tenants
   * tenant-add & sub=:id
   * [createTenant]
   * - get user by id
   * - send 404 if not found
   * - insert a new tenant and get tenant id
   * - send 400 if failed
   * - insert a new tenant user record
   * - send 400 if failed
   * - send 201 with data
   */
  @Post('/:id/tenants')
  @HttpCode(201)
  @UseGuards(new PermissionsGuard(['tenant-add'], { sub: 'id' }))
  createTenant(
    @Param('id', ParseIntPipe) id: number,
    @Body(new CustomValidationPipe(createTenantSchema)) params: CreateTenantDto,
  ) {
    return this.tenantService.createTenant(id, params);
  }
}
