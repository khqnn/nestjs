import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TenantService } from "./tenants.service";
import { UpdateTenantDto, updateTenantSchema } from "./dto/tenant-update.dto";
import { CreateTenantUserDto, createTenantUserSchema } from "./dto/tenant-user-create.dto";
import { UpdateTenantUserDto, updateTenantUserSchema } from "./dto/tenant-user-update.dto";
import { CustomValidationPipe } from "src/common/pipes/validation.pipe";
import { PermissionsGuard } from "src/common/guards/permissions.guard";


@Controller('tenants')
export class TenantController {

    constructor(private tenantService: TenantService) { }

    /**
     * GET      /tenants/:id
     * tenant-read & tenant_id=:id
     * [getTenant]
     */
    @Get('/:id')
    @UseGuards(new PermissionsGuard(['tenant-read', '*'], {path: 'id', sub: 'tenant_id'}))
    get(@Param('id', ParseIntPipe) id: number) {
        return this.tenantService.getTenant(id)
    }

    /**
     * PUT      /tenants/:id
     * tetnant-change & tenant_id=:id
     * [updateTenant]
     */
    @Put('/:id')
    @UseGuards(new PermissionsGuard(['tenant-change', '*'], {path: 'id', sub: 'tenant_id'}))
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(new CustomValidationPipe(updateTenantSchema)) params: UpdateTenantDto
    ) {
        return this.tenantService.updateTenant(id, params)
    }

    /**
     * DELETE      /tenants/:id
     * owner=true
     * [deleteTenant]
     */
    @Delete('/:id')
    @UseGuards(new PermissionsGuard(null, {should_owner: true}))
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.tenantService.deleteTenant(id)
    }

    /**
     * GET      /tenants/:id/users
     * tenant-user-read & tenant_id=:id
     * [getTenantUsers]
     */
    @Get('/:id/users')
    @UseGuards(new PermissionsGuard(['tenant-user-read', '*'], {path: 'id', sub: 'tenant_id'}))
    getTenantUsers(@Param('id', ParseIntPipe) id: number) {
        return this.tenantService.getTenantUsers(id)
    }

    /**
     * POST      /tenants/:id/users
     * tenant-user-add & tenant_id=:id
     * [addTenantUser]
     */
    @Post('/:id/users')
    @UseGuards(new PermissionsGuard(['tenant-user0add', '*'], {path: 'id', sub: 'tenant_id'}))
    addTenantUser(
        @Param('id', ParseIntPipe) id: number,
        @Body(new CustomValidationPipe(createTenantUserSchema)) params: CreateTenantUserDto
    ) {
        return this.tenantService.addTenantUser(id, params)
    }

    /**
     * PUT      /tenants/:tenantId/users/:userId
     * tenant-user-change & tenant_id=:tenantId
     * [updateTenantUser]
     */
    @Put('/:tenantId/users/:userId')
    @UseGuards(new PermissionsGuard(['tenant-user-change', '*'], {path: 'tenantId', sub: 'tenant_id'}))
    updateTenantUser(
        @Param('tenantId', ParseIntPipe) tenantId: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Body(new CustomValidationPipe(updateTenantUserSchema)) params: UpdateTenantUserDto
    ) {
        return this.tenantService.updateTenantUser(tenantId, userId, params)
    }

    /**
     * DELETE      /tenants/:tenantId/users/:userId
     * tenant-user-remove & tenant_id=:tenantId
     * [removeTenantUser]
     */
    @Delete('/:tenantId/users/:userId')
    @UseGuards(new PermissionsGuard(['tenant-user-remove', '*'], {path: 'tenantId', sub: 'tenant_id'}))
    removeTenantUser(
        @Param('tenantId', ParseIntPipe) tenantId: number,
        @Param('userId', ParseIntPipe) userId: number
    ) {
        return this.tenantService.removeTenantUser(tenantId, userId)
    }

}