import CreepAction, { ICreepAction } from "./creepAction";
import * as SourceManager from "./../sources/sourceManager";

export interface IHarvester {

  targetSource: Source;

  tryHarvest(): number;
  moveToHarvest(): void;

  action(): boolean;
}

export default class Harvester extends CreepAction implements IHarvester, ICreepAction {

  public targetSource: Source;
  public targetEnergyDropOff: Spawn | Structure;

  public setCreep(creep: Creep) {
    super.setCreep(creep);
    this.targetSource = Game.getObjectById<Source>(this.creep.memory.target_source_id);
  }
  public tryHarvest(): number {
    return this.creep.harvest(this.targetSource);
  }

  public moveToHarvest(): void {
    if (this.tryHarvest() === ERR_NOT_IN_RANGE) {
      let moveError = this.moveTo(this.targetSource);
      console.log("move error: " + moveError);
      if (moveError === -2) {
        this.targetSource = SourceManager.getNextSource(this.targetSource);
        this.creep.memory.target_source_id = this.targetSource.id;
      }
    }
  }

  public action(): boolean {
    if (this.needsRenew()){
      this.moveToRenew();
    }else {
      this.moveToHarvest();
    }

    return true;
  }

}
