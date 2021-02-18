namespace SpriteKind {
    export const Rock = SpriteKind.create()
    export const Collider = SpriteKind.create()
    export const treasure = SpriteKind.create()
    export const Mine = SpriteKind.create()
}
namespace ImageArrayProp {
    export const Direction_Images = ImageArrayProp.create()
}
sprites.onOverlap(SpriteKind.Collider, SpriteKind.Rock, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        otherSprite.startEffect(effects.disintegrate, 100)
        sprites.changeDataNumberBy(otherSprite, "Hits", -1)
    }
    if (sprites.readDataNumber(otherSprite, "Hits") < 0) {
        otherSprite.destroy()
        tiles.setWallAt(tiles.locationOfSprite(otherSprite), false)
        Found = sprites.create(Treasure[randint(0, Treasure.length - 1)], SpriteKind.treasure)
        Found.setPosition(otherSprite.x, otherSprite.y)
    }
    pause(1000)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Directions != 0) {
        Directions = 0
        Wolf.setImage(blockObject.getImageArrayProperty(Direction_Image, ImageArrayProp.Direction_Images)[Directions])
    }
})
function Spawn_dashboard () {
	
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Directions != 3) {
        Directions = 3
        Wolf.setImage(blockObject.getImageArrayProperty(Direction_Image, ImageArrayProp.Direction_Images)[Directions])
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.treasure, function (sprite, otherSprite) {
    otherSprite.follow(sprite)
    otherSprite.setKind(SpriteKind.Mine)
    otherSprite.lifespan = 1000
    info.changeScoreBy(1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Directions != 1) {
        Directions = 1
        Wolf.setImage(blockObject.getImageArrayProperty(Direction_Image, ImageArrayProp.Direction_Images)[Directions])
    }
})
function Spawn_Rocks () {
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        if (Math.percentChance(70)) {
            Rock = sprites.create(img`
                . f f f f f f f f f f f f . . . 
                f f b b b b b c c c c c f f . . 
                f b b b b b b b c c c c c f f . 
                f b b b b b b b c c c c c c f f 
                f b b b b b b b b c c c c c c f 
                f b b b b b b b b c c c c c c f 
                f b b b b b b b b c c c c c c f 
                f b b b b b b b b c c c c c c f 
                f b b b b b b b c c c c c c c f 
                f f b b b b b c c c c c c c f f 
                . f f b b b b c c c c c c f f . 
                . . f f f f f f f f f f f f . . 
                `, SpriteKind.Rock)
            tiles.placeOnTile(Rock, value)
            tiles.setWallAt(value, true)
            sprites.setDataNumber(Rock, "Hits", 3)
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Directions != 2) {
        Directions = 2
        Wolf.setImage(blockObject.getImageArrayProperty(Direction_Image, ImageArrayProp.Direction_Images)[Directions])
    }
})
let Rock: Sprite = null
let Found: Sprite = null
let Directions = 0
let Direction_Image: blockObject.BlockObject = null
let Wolf: Sprite = null
let Treasure: Image[] = []
Treasure = [
img`
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . 8 9 1 8 9 9 9 8 9 6 6 8 6 8 . 
    8 8 1 8 1 8 9 8 9 8 9 8 6 8 6 8 
    8 9 8 1 1 9 8 9 9 9 8 6 6 6 8 8 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . . 8 1 9 8 9 9 9 9 8 6 6 8 . . 
    . . . 8 9 9 8 6 6 8 6 6 8 . . . 
    . . . . 8 6 8 6 6 8 6 8 . . . . 
    . . . . . 8 6 8 8 6 8 . . . . . 
    . . . . . . 8 8 8 8 . . . . . . 
    . . . . . . . 8 8 . . . . . . . 
    `,
img`
    . . . . . 6 6 6 6 6 . . . . . . 
    . . . . 6 7 7 7 7 7 6 . . . . . 
    . . . 6 7 7 6 6 6 7 7 6 . . . . 
    . . . 6 7 6 7 7 7 6 7 6 . . . . 
    . . . 6 7 6 7 6 7 6 7 6 . . . . 
    . . . 6 7 6 7 6 7 6 7 6 . . . . 
    . . . 6 7 6 7 7 7 6 7 6 . . . . 
    . . . 6 7 7 6 6 6 7 7 6 . . . . 
    . . . . 6 7 7 7 7 7 6 . . . . . 
    . . . . . 6 6 6 6 6 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
assets.tile`myTile2`,
img`
    . . . . . 4 4 4 4 4 . . . . . . 
    . . . . 4 5 5 5 5 5 4 . . . . . 
    . . . 4 5 4 4 4 4 4 5 4 . . . . 
    . . . 4 5 4 5 5 5 4 5 4 . . . . 
    . . . 4 5 4 5 5 5 4 5 4 . . . . 
    . . . 4 5 4 5 5 5 4 5 4 . . . . 
    . . . 4 5 4 5 5 5 4 5 4 . . . . 
    . . . 4 5 4 4 4 4 4 5 4 . . . . 
    . . . . 4 5 5 5 5 5 4 . . . . . 
    . . . . . 4 4 4 4 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . f f f f f f f . . . . . 
    . . . f 5 5 5 5 5 5 5 f . . . . 
    . . f 1 1 4 4 4 4 4 5 5 f . . . 
    . f 1 1 4 f f f f f 4 5 5 f . . 
    . f 1 4 f 4 4 4 5 5 f 4 5 f . . 
    . f 1 4 f 5 4 4 4 5 f 4 5 f . . 
    . f 5 4 f 1 5 4 4 4 f 4 5 f . . 
    . f 5 4 f 5 1 5 4 4 f 4 1 f . . 
    . f 5 4 f 5 5 1 5 4 f 4 1 f . . 
    . f 5 5 4 f f f f f 4 1 1 f . . 
    . . f 5 5 4 4 4 4 4 1 1 f . . . 
    . . . f 5 5 5 5 5 5 5 f . . . . 
    . . . . f f f f f f f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 2 1 5 2 2 2 5 2 4 4 5 4 5 . 
    5 5 1 5 1 5 2 5 2 5 2 5 4 5 4 5 
    5 2 5 1 1 2 5 2 2 2 5 4 4 4 5 5 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    . . 5 1 2 5 2 2 2 2 5 4 4 5 . . 
    . . . 5 2 2 5 4 4 5 4 4 5 . . . 
    . . . . 5 4 5 4 4 5 4 5 . . . . 
    . . . . . 5 4 5 5 4 5 . . . . . 
    . . . . . . 5 5 5 5 . . . . . . 
    . . . . . . . 5 5 . . . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `,
img`
    . . . c c c c c c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b b c 
    . . . c b b b c c 
    . . c b b b c 1 c 
    . c c b b b c 1 c 
    c 1 1 c b b c 1 c 
    c 1 1 1 c c c c . 
    c 1 1 1 1 c . . . 
    . c 1 1 c . . . . 
    . . c c . . . . . 
    `
]
let Rock_Brake = 0
let Hit_Box = sprites.create(img`
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    `, SpriteKind.Collider)
Wolf = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . f f b b b b f f . . . . . 
    . . . f d b b b b d f . . . . . 
    . . . b b b b b b b b . . . . . 
    . . . b 1 8 b b 8 1 b . . . . . 
    . . . b 1 f b b f 1 b . . . . . 
    . . . b b b b b b b b . . . . . 
    . . . b b 1 f f 1 b b . . . . . 
    . . . b b 1 1 1 1 b b . . . . . 
    . . . c c d d d d c c b . . . . 
    . . . c c 1 1 d d c c b b . . . 
    . . . b b 1 1 d d b b b b b . . 
    . . . c b 1 1 d d b b b c b b . 
    . . . c b 1 1 d d b b b c b b . 
    . . . c b 1 1 d d b b c c b b . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Wolf)
tiles.setTilemap(tilemap`level1`)
scene.cameraFollowSprite(Wolf)
Wolf.z = 100
Spawn_Rocks()
Direction_Image = blockObject.create()
Directions = 1
blockObject.setImageArrayProperty(Direction_Image, ImageArrayProp.Direction_Images, [img`
    ..1111..........
    ..1ff1..........
    b81bbf1b........
    bf1bb81b........
    bbbbbbbb........
    ffbbbbff........
    fdbbbbdf........
    bbbbbbbb........
    bbbbbbbb........
    bbbbbbbb........
    bbbbbbbb........
    bbbbbbbb........
    bbbbbbbb........
    .bbcbbb.........
    ...cc...........
    ..ccc...........
    ..ccc...........
    ...cc...........
    ...c............
    ................
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . f f b b b b f f 
    . . . . . . . . f d b b b b d f 
    . . . . . . . . b b b b b b b b 
    . . . . . . . . b 1 8 b b 8 1 b 
    1 1 1 . . . . . b 1 f b b f 1 b 
    1 1 b . . . . . b b b b b b b b 
    1 b b b . . . . b b 1 f f 1 b b 
    . . b b . . . . b b 1 1 1 1 b b 
    . . . . b b b b c c d d d d c c 
    . . . . b b b b c c d d 1 1 c c 
    . . . . b b d 1 1 d b b 1 1 b b 
    . . . . b b 1 d 1 1 b c 1 . b c 
    . . . . b b c c . . b c . . b c 
    . . . . b b c c . . b b . . b c 
    . . . . . . . . . . . . . . . . 
    `, img`
    ................
    ...c............
    ...cc...........
    ..ccc...........
    ..ccc...........
    ...cc...........
    .bbcbbb.........
    bbbbbbbb........
    bbbbbbbb........
    bbbbbbbb........
    bbbbbbbb........
    bbbbbbbb........
    bbbbbbbb........
    fdbbbbdf........
    ffbbbbff........
    bbbbbbbb........
    b1fbbf1b........
    b18bb81b........
    ..1ff1..........
    ..1111..........
    `, img`
    . . . . . . . . . . . . . . . . 
    f f b b b b f f . . . . . . . . 
    f d b b b b d f . . . . . . . . 
    b b b b b b b b . . . . . . . . 
    b 1 8 b b 8 1 b . . . . . . . . 
    b 1 f b b f 1 b . . . . . 1 1 1 
    b b b b b b b b . . . . . b 1 1 
    b b 1 f f 1 b b . . . . b b b 1 
    b b 1 1 1 1 b b . . . . b b . . 
    c c d d d d c c b b b b . . . . 
    c c 1 1 d d c c b b b b . . . . 
    b b 1 1 b b d 1 1 d b b . . . . 
    c b . 1 c b 1 1 d 1 b b . . . . 
    c b . . c b . . c c b b . . . . 
    c b . . b b . . c c b b . . . . 
    . . . . . . . . . . . . . . . . 
    `])
Hit_Box.setFlag(SpriteFlag.Invisible, true)
game.onUpdate(function () {
    if (Directions == 0) {
        Hit_Box.setPosition(Wolf.x, Wolf.y - 16)
    } else if (Directions == 1) {
        Hit_Box.setPosition(Wolf.x + 16, Wolf.y)
    } else if (Directions == 2) {
        Hit_Box.setPosition(Wolf.x, Wolf.y)
    } else {
        Hit_Box.setPosition(Wolf.x - 16, 0)
    }
})
