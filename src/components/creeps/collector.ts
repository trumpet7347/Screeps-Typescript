import CreepAction, { ICreepAction } from "./creepAction";
import * as RoomManager from "./../rooms/roomManager";

export interface ICollector {

  targetResource: any;
  targetEnergyDropOff: Spawn | Structure;

  isBagFull(): boolean;
  tryCollect(): number;
  moveToCollect(): void;

  action(): boolean;
}

export default class Collector extends CreepAction implements ICollector, ICreepAction {

  public targetResource: any;
  public targetEnergyDropOff: Spawn | Structure;

  public setCreep(creep: Creep) {
    super.setCreep(creep);

    this.targetResource = RoomManager.getFirstDroppedResource(creep.room);
    this.targetEnergyDropOff = Game.getObjectById<Spawn | Structure>(this.creep.memory.target_energy_dropoff_id);
  }

  public isBagFull(): boolean {
    return (this.creep.carry.energy === this.creep.carryCapacity);
  }

  public tryEnergyDropOff(): number {
    return this.creep.transfer(this.targetEnergyDropOff, RESOURCE_ENERGY);
  }

  public tryCollect(): number {
    return this.creep.pickup(this.targetResource);
  }

  public moveToCollect(): void {
    if (this.tryCollect() === ERR_NOT_IN_RANGE) {
      this.moveTo(this.targetResource);
    }
  }

  public moveToDropEnergy(): void {
    if (this.tryEnergyDropOff() === ERR_NOT_IN_RANGE) {
      this.moveTo(this.targetEnergyDropOff);
    }
  }

  public action(): boolean {
    if (this.needsRenew()) {
      this.moveToRenew();
    } else if (this.isBagFull()) {
      this.moveToDropEnergy();
    } else {
      this.moveToCollect();
    }

    return true;
  }

}
