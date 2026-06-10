import { ApiProperty } from "@nestjs/swagger";

export class HealthCheckResponseDto {
  @ApiProperty({ example: "ok" })
  status!: "ok";

  @ApiProperty({ example: "api-gateway" })
  service!: string;

  @ApiProperty({ example: 3600 })
  uptime!: number;

  @ApiProperty({ example: "2026-06-10T12:00:00.000Z" })
  timestamp!: string;

  @ApiProperty({ example: "0.0.0" })
  version!: string;

  @ApiProperty({ example: "development" })
  environment!: string;
}
