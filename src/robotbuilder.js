import kaplay from "kaplay";

kaplay({
    width: 320,
    height: 480,
    letterbox: true,
    global: true,
    background: [243, 239, 224],
});

const RECIPES = {
    "water+earth": "mud",
    "fire+water": "steam",
    "earth+fire": "lava",
    "mud+fire": "brick",
    "Copper Wire+Plastic": "Cables",
    "Aluminium+Cables": "Motor"
};

function checkRecipe(itemA, itemB) {
    return RECIPES[`${itemA}+${itemB}`] || RECIPES[`${itemB}+${itemA}`] || null;
}

const ITEM_COLORS = {
    "water": [60, 150, 255],
    "earth": [139, 69, 19],
    "fire": [255, 69, 0],
    "mud": [101, 67, 33],
    "steam": [200, 200, 200],
    "lava": [255, 0, 0],
    "brick": [178, 34, 34],
};

const ITEM_IMAGES = {
    // Add your image paths here carefully with quotes!
    // "water": "/assets/water.png",
    "Copper Wire": "/assets/coppercable.png",
    "Plastic": "/assets/plastic.png",
    "Cables": "/assets/wires.png",
    "Aluminium": "/assets/Aluminium.png",
    "Motor": "/assets/motor.png"
};

for (const [itemName, path] of Object.entries(ITEM_IMAGES)) {
    loadSprite(itemName, path);
}

function mergeable(itemName) {
    return {
        id: "mergeable",
        name: itemName,
    };
}

scene("game", () => {
    
    const trash = add([
        rect(50, 50, { radius: 6 }),
        pos(40, 40),
        anchor("center"),
        color(180, 80, 80),
        outline(3, rgb(100, 40, 40)),
        area(),
        "trash"
    ]);

    trash.add([
        text("Trash", { size: 12 }),
        anchor("center"),
        color(255, 255, 255),
    ]);

    function spawnItem(itemName, x, y, isSpawner = false) {
        const rgbArgs = ITEM_COLORS[itemName] || [89, 122, 89];
        
        const tags = ["draggable"];
        if (isSpawner) {
            tags.push("spawner");
        } else {
            tags.push("element");
        }

        const visualComponents = [];
        if (ITEM_IMAGES[itemName]) {
            visualComponents.push(sprite(itemName, { width: 60, height: 60 }));
        } else {
            visualComponents.push(rect(60, 60, { radius: 8 }));
            visualComponents.push(color(...rgbArgs));
            visualComponents.push(outline(3, rgb(46, 66, 46)));
        }

        const item = add([
            ...visualComponents,
            pos(x, y),
            anchor("center"),
            area(), 
            mergeable(itemName),
            { isSpawner: isSpawner },
            ...tags 
        ]);

        if (!ITEM_IMAGES[itemName]) {
            item.add([
                text(itemName, { size: 14 }),
                anchor("center"),
                color(255, 255, 255),
            ]);
        }
        
        return item;
    }

    spawnItem("Copper Wire", width() / 4, height() - 80, true);
    spawnItem("Plastic", width() / 2, height() - 80, true);
    spawnItem("Aluminium", (width() / 4) * 3, height() - 80, true);

    let draggedItem = null;

    onMousePress(() => {
        const mpos = mousePos();
        const hovered = get("draggable").filter(e => e.hasPoint(mpos));
        
        if (hovered.length > 0) {
            const clickedItem = hovered[hovered.length - 1];
            
            if (clickedItem.isSpawner) {
                draggedItem = spawnItem(clickedItem.name, mpos.x, mpos.y, false);
            } else {
                draggedItem = clickedItem;
            }
        }
    });

    onMouseMove(() => {
        if (draggedItem) {
            let targetX = mousePos().x;
            let targetY = mousePos().y;

            const halfSize = 30; 
            targetX = Math.max(halfSize, Math.min(width() - halfSize, targetX));
            targetY = Math.max(halfSize, Math.min(height() - halfSize, targetY));

            draggedItem.pos.x = targetX;
            draggedItem.pos.y = targetY;
        }
    });

    onMouseRelease(() => {
        if (draggedItem) {
            if (draggedItem.isColliding(trash)) {
                destroy(draggedItem);
                
                add([
                    circle(30),
                    pos(trash.pos.x, trash.pos.y),
                    anchor("center"),
                    color(180, 80, 80),
                    opacity(0.8),
                    lifespan(0.1, { fade: 0.1 })
                ]);
                
                draggedItem = null;
                return;
            }

            const allElements = get("element");

            for (const target of allElements) {
                if (target !== draggedItem && draggedItem.isColliding(target)) {
                    const result = checkRecipe(draggedItem.name, target.name);
                    
                    if (result) {
                        const targetX = target.pos.x;
                        const targetY = target.pos.y;

                        destroy(draggedItem);
                        destroy(target);

                        add([
                            circle(40),
                            pos(targetX, targetY), 
                            anchor("center"),
                            color(255, 255, 255),
                            opacity(0.8),
                            lifespan(0.1, { fade: 0.1 })
                        ]);
                        
                        spawnItem(result, targetX, targetY, false); 
                        break; 
                    }
                }
            }
            draggedItem = null;
        }
    });

    add([
        text("Drag to merge!", { size: 20 }),
        pos(center().x + 20, 40),
        anchor("center"),
        color(46, 66, 46),
    ]);
});

go("game");