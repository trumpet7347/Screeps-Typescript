import * as Config from "./../../config/config";
import * as RoomManager from "./../rooms/roomManager";

export let sources: Source[];
export let sourceCount: number;

export function loadSources() {
  sources = RoomManager.getFirstRoom().find<Source>(FIND_SOURCES_ACTIVE);
  sourceCount = _.size(sources);

  if (Config.VERBOSE) {
    console.log(sourceCount + " sources in room.");
  }
}

export function getFirstSource(): Source {
  return sources[0];
}

export function getNextSource(source: Source): Source {
  let index = _.findIndex(sources, function(s){return s.id === source.id;});
  return sources[index + 1];
}

// export function getMaxHarvesers(): number {
//   let maxHarvesters = 0;

//   _.forEach(sources, function(source: Source){
//     let sourcePos = source.pos;
//     sourcePos.
//   });
//   return sources[index + 1];
// }

