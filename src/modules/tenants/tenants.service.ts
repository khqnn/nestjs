import { Injectable } from "@nestjs/common";
import { CreateTenantDto } from "./dto/tenant-create.dto";
import { UpdateTenantDto } from "./dto/tenant-update.dto";
import { CreateTenantUserDto } from "./dto/tenant-user-create.dto";
import { UpdateTenantUserDto } from "./dto/tenant-user-update.dto";


@Injectable()
export class TenantService{

    getUserTenants(userId: number){
        return `This method will get user tenants...`
    }

    createTenant(userId: number, params: CreateTenantDto){
        return `This method will create a new tenant...`
    }

    getTenant(id: number){
        return `This method will get tenant details...`
    }

    updateTenant(id: number, params: UpdateTenantDto){
        return `This method will update a tenant...`
    }

    deleteTenant(id: number){
        return `This method will delete atenant...`
    }

    getTenantUsers(id: number){
        return `This method will get tenant uers...`
    }

    addTenantUser(userId: number, params: CreateTenantUserDto){
        return `This method will create a new tenant user...`
    }

    updateTenantUser(tenantId: number, userId: number, params: UpdateTenantUserDto){
        return `This method will update a tenant user...`
    }



    removeTenantUser(tenantId: number, userId: number){
        return `This method will remove a tenant user...`
    }

}