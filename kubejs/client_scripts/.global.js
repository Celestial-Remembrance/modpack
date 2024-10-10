//priority : 1

/**
 *
 * @param {string} input
 * @returns ᴀʙᴄᴅᴇꜰɢʜiᴊᴋʟᴍɴᴏᴘꞯʀꜱᴛᴜᴠᴡxʏᴢ
 */
function convertString(input) {
  const charMap = {
    a: "ᴀ",
    b: "ʙ",
    c: "ᴄ",
    d: "ᴅ",
    e: "ᴇ",
    f: "ꜰ",
    g: "ɢ",
    h: "ʜ",
    i: "i",
    j: "ᴊ",
    k: "ᴋ",
    l: "ʟ",
    m: "ᴍ",
    n: "ɴ",
    o: "ᴏ",
    p: "ᴘ",
    q: "ꞯ",
    r: "ʀ",
    s: "ꜱ",
    t: "ᴛ",
    u: "ᴜ",
    v: "ᴠ",
    w: "ᴡ",
    x: "x",
    y: "ʏ",
    z: "ᴢ",
  };

  let result = "";
  for (let char of input.toLowerCase()) {
    result += charMap[char] || char;
  }

  return result;
}

/**
 *
 * @param {ItemStack} what
 * @param {string} type Input|Output
 * @param {int} x
 * @param {int} y
 * @param {Internal.IRecipeLayoutBuilder} builder
 */
let verify = (what, type, x, y, builder) => {
  if (what != "minecraft:air" && what != undefined && what != null) {
    builder.addSlot(type, x, y).addItemStack(Item.of(what));
  } else {
    builder.addSlot(type, x, y).addItemStack(Item.of("minecraft:air"));
  }
};

/**
 *
 * @param {ItemStack} what
 * @param {string} type Input|Output
 * @param {int} x
 * @param {int} y
 * @param {Internal.IRecipeLayoutBuilder} builder
 */
let verifyCrude = (what, type, x, y, builder) => {
  if (what != "minecraft:air" && what != undefined && what != null) {
    builder.addSlot(type, x, y).addItemStack(what);
  } else {
    builder.addSlot(type, x, y).addItemStack(Item.of("minecraft:air"));
  }
};

/**
 *
 * @param {FluidStack} what
 * @param {string} type Input|Output
 * @param {int} x
 * @param {int} y
 * @param {Internal.IRecipeLayoutBuilder} builder
 */
let verifyFluid = (what, type, x, y, builder) => {
  builder.addSlot(type, x, y).addFluidStack(what, 1000);
};

/**
 *
 * @param {string} stack Item|Block|Fluid
 * @param {*} what
 * @param {string} type Input|Output
 * @param {int} x
 * @param {int} y
 * @param {Internal.IRecipeLayoutBuilder} builder
 */
let verifyMixed = (stack, what, type, x, y, builder) => {
  if (stack == "item" || stack == "block") {
    if (what != "minecraft:air" && what != undefined && what != null) {
      builder.addSlot(type, x, y).addItemStack(what);
    } else {
      builder.addSlot(type, x, y).addItemStack(Item.of("minecraft:air"));
    }
  } else if (stack == "fluid") {
    builder.addSlot(type, x, y).addFluidStack(what, 1000);
  }
};
