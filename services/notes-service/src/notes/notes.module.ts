import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { NotesController } from "@/notes/notes.controller";
import { NotesService } from "@/notes/notes.service";
import { NotesRepository } from "@/notes/notes.repository";
import { CreateNoteCommand } from "@/notes/commands/create-note.command";
import { UpdateNoteCommand } from "@/notes/commands/update-note.command";
import { DeleteNoteCommand } from "@/notes/commands/delete-note.command";
import { JwtStrategy } from "@/notes/strategies/jwt.strategy";
import { JwtGuard } from "@/notes/guards/jwt.guard";
import { SoapNotesModule } from "@/soap-notes/soap-notes.module";
import { AttachmentsModule } from "@/attachments/attachments.module";
import { EventsModule } from "@/events/events.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    EventsModule,
    SoapNotesModule,
    AttachmentsModule,
  ],
  controllers: [NotesController],
  providers: [
    NotesService,
    NotesRepository,
    CreateNoteCommand,
    UpdateNoteCommand,
    DeleteNoteCommand,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [NotesService, NotesRepository],
})
export class NotesModule {}
