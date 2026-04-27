import { commands } from "./configs";
import "./animations";
import "./character-manager";
import "./models";
import "./skills";
import "./world-manager";

Object.entries(commands).forEach(([command, handler]) => {
  RegisterCommand(command, handler, false);
});
