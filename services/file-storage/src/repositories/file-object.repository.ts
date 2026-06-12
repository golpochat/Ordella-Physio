import { Injectable } from "@nestjs/common";

import type { FileVariant, Prisma, StorageProvider } from "@/generated/prisma";

import { DatabaseService } from "@/database/database.module";

import type { FileObjectRecord } from "@/models/FileObject";



export type CreateFileObjectInput = {

  tenantId: string;

  ownerUserId: string;

  entityType?: string | null;

  entityId?: string | null;

  filename: string;

  mimeType: string;

  sizeBytes: number;

  storageProvider: StorageProvider;

  storageKey: string;

  checksum?: string | null;

  isPublic?: boolean;

  expiresAt?: Date | null;

  parentFileId?: string | null;

  variant?: FileVariant;

  version?: number;

  previousVersionFileId?: string | null;

};



export type ListFileObjectsFilters = {

  tenantId: string;

  entityType?: string;

  entityId?: string;

  ownerUserId?: string;

  includeDeleted?: boolean;

  variantsOnly?: FileVariant[];

  page: number;

  limit: number;

};



@Injectable()

export class FileObjectRepository {

  constructor(private readonly database: DatabaseService) {}



  create(data: CreateFileObjectInput): Promise<FileObjectRecord> {

    return this.database.fileObject.create({ data });

  }



  findById(id: string): Promise<FileObjectRecord | null> {

    return this.database.fileObject.findUnique({ where: { id } });

  }



  findByParentAndVariant(

    parentFileId: string,

    variant: FileVariant,

  ): Promise<FileObjectRecord | null> {

    return this.database.fileObject.findFirst({

      where: {

        parentFileId,

        variant,

      },

      orderBy: { createdAt: "desc" },

    });

  }



  findByPreviousVersionFileId(previousVersionFileId: string): Promise<FileObjectRecord | null> {

    return this.database.fileObject.findFirst({

      where: { previousVersionFileId },

      orderBy: { version: "desc" },

    });

  }



  update(id: string, data: Prisma.FileObjectUpdateInput): Promise<FileObjectRecord> {

    return this.database.fileObject.update({ where: { id }, data });

  }



  deleteById(id: string): Promise<FileObjectRecord> {

    return this.database.fileObject.delete({ where: { id } });

  }



  findSoftDeletedBefore(cutoff: Date): Promise<FileObjectRecord[]> {

    return this.database.fileObject.findMany({

      where: {

        isDeleted: true,

        deletedAt: { lte: cutoff },

      },

      orderBy: { deletedAt: "asc" },

      take: 200,

    });

  }



  findExpiredActive(before: Date): Promise<FileObjectRecord[]> {

    return this.database.fileObject.findMany({

      where: {

        isDeleted: false,

        expiresAt: { lte: before },

      },

      orderBy: { expiresAt: "asc" },

      take: 200,

    });

  }



  async softDeleteByEntity(

    tenantId: string,

    entityType: string,

    entityId: string,

    deletedByUserId: string,

  ): Promise<number> {

    const result = await this.database.fileObject.updateMany({

      where: {

        tenantId,

        entityType,

        entityId,

        isDeleted: false,

      },

      data: {

        isDeleted: true,

        deletedAt: new Date(),

        deletedByUserId,

      },

    });



    return result.count;

  }



  async list(filters: ListFileObjectsFilters): Promise<{

    data: FileObjectRecord[];

    total: number;

  }> {

    const variantsOnly = filters.variantsOnly ?? ["ORIGINAL"];



    const where: Prisma.FileObjectWhereInput = {

      tenantId: filters.tenantId,

      ...(filters.entityType ? { entityType: filters.entityType } : {}),

      ...(filters.entityId ? { entityId: filters.entityId } : {}),

      ...(filters.ownerUserId ? { ownerUserId: filters.ownerUserId } : {}),

      ...(filters.includeDeleted ? {} : { isDeleted: false }),

      variant: { in: variantsOnly },

    };



    const skip = (filters.page - 1) * filters.limit;



    const [data, total] = await this.database.$transaction([

      this.database.fileObject.findMany({

        where,

        orderBy: { createdAt: "desc" },

        skip,

        take: filters.limit,

      }),

      this.database.fileObject.count({ where }),

    ]);



    return { data, total };

  }

  sumSizeBytesByTenant(tenantId: string) {
    return this.database.fileObject.aggregate({
      where: {
        tenantId,
        isDeleted: false,
      },
      _sum: { sizeBytes: true },
    });
  }

}


