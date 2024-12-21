/**
 *
 * @param {string} input
 * @returns string capitalized
 * example:
 * [in] "it is like that" | "hi_hello"
 * [out] "It Is Like That" | "Hi Hello"
 */
function UpCased(input) {
  return input
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back together
}

let isDef = (any, replace) => {
  return any != undefined ? any : replace != undefined ? replace : 1;
};

const Generic = "basic"

// const ALL = [Qdrill, Qprocess, DEV];

MMEvents.registerControllers((event) => {
  /**
   *
   * @param {string} name
   * @returns mm:name_controller
   */
  let CreateController = (name) => {
    event
      .create(name + "_controller")
      .name(UpCased(name + "_controller"))
      .type("mm:machine");
  };

  // CreateController(Qprocess);
  // CreateController(Qdrill);
  // CreateController(DEV);
  CreateController(Generic)
});

MMEvents.registerExtraBlocks((event) => {
  event
  .create("gearbox")
  .type("mm:gearbox")
  .name('Gearbox');

  event
  .create("vent")
  .type("mm:vent")
  .name('Vent');

  event
  .create("circuit")
  .type("mm:circuit")
  .name('Circuit');
});

MMEvents.registerPorts((event) => {
  /**
   *
   * @param {string} name
   * @param {string|string[]} controllerId
   */
  let portCreation = (name, controllerId) => {
    // let list_of_controller = [];
    // if (!Array.isArray(controllerId)) controllerId = [controllerId];
    // controllerId.forEach((e) => {
    //   list_of_controller.push("mm:" + e);
    // });
    return event
      .create(name + "_port")
      .name(UpCased(name + "_port"))
      .controllerId(controllerId);
  };
  /**
   *
   * @param {string} name
   * @param {string|string[]} controllerId
   * @param {number} MaxFE
   * @param {number} FE_rate
   */
  let CreateEnergyPort = (name, controllerId, MaxFE, FE_rate) => {
    portCreation(name+"_energy", controllerId).config("mm:energy", (c) => {
      c.capacity(isDef(MaxFE))
        .maxReceive(isDef(FE_rate))
        .maxExtract(isDef(FE_rate));
    });
  };
  /**
   *
   * @param {string} name
   * @param {string|string[]} controllerId
   * @param {number} NumX
   * @param {number} NumY
   */
  let CreateItemPort = (name, controllerId, NumX, NumY) => {
    portCreation(name+"_item", controllerId).config("mm:item", (c) => {
      c.rows(isDef(NumX)).columns(isDef(NumY, isDef(NumX)));
    });
  };
  /**
   *
   * @param {string} name
   * @param {string|string[]} controllerId
   * @param {number} MaxMB
   * @param {number} NumX
   * @param {number} NumY
   */
  let CreateFluidPort = (name, controllerId, NumX, NumY, MaxMB) => {
    portCreation(name+"_fluid", controllerId).config("mm:fluid", (c) => {
      c.rows(isDef(NumX))
        .columns(isDef(NumY, isDef(NumX)))
        .slotCapacity(isDef(MaxMB));
    });
  };
  /**
   *
   * @param {string} name
   * @param {string|string[]} controllerId
   * @param {number} MaxMB
   */
  let CreateGasPort = (name, controllerId, MaxMB) => {
    portCreation(name+"_gas", controllerId).config("mm:mekanism/gas", (c) => {
      c.capacity(isDef(MaxMB));
    });
  };
  /**
   * 
   * @param {string} name 
   * @param {string|string[]} controllerId 
   * @param {number} modifier 
   */
  let CreateSetPort = (name, controllerId, modifier) => {
    CreateItemPort(name, controllerId, 1 * modifier);
    CreateFluidPort(
      name,
      controllerId,
      1 * modifier,
      1 * modifier,
      1000 * modifier
    );
    CreateEnergyPort(name, controllerId, 1000 * modifier, 100 * modifier);
    CreateGasPort(name, controllerId, 1000 * modifier);
  };





  CreateSetPort("primitive",Generic,1)
  CreateSetPort("basic",Generic,3)
  CreateSetPort("advanced",Generic,5)


});
