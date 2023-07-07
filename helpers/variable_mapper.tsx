
export function setBackground(emotion: string | undefined){
    // list of background with angry tone
    const angry_background = [
        'hellish fire',
        'fiery volcano with lava',
        'sinister cave',
        'apocalyptic city scape',
        'dark stygian forest',
        'war zone',
        'red-hued skyline'
    ]
    const calm_background = [
        'serene beach sunset',
        'zen garden',
        'misty mountain lake',
        'peaceful forest clearing',
        'calming pastel sky',
        'lake side'
    ]
    const happy_background = [
        'beach',
        'sunny field of flowers',
        'joyful crowds',
        'festive events',
        'carnival',
    ]
    const sad_background = [
        'rainy window',
        'snow blizzard',
        'deserted pier',
        'old cemetery',
        'inside a cave'
    ]
    const surprised_background = [
        'zoo',
        'birthday party',
        'exploding colors'
    ]
    const unknown_emotion = [
        'abstract shapes',
        'mysterious door'
    ]

    if (emotion === 'angry'){
        // pick random angry background
        return angry_background[Math.floor(Math.random() * angry_background.length)]
    } else if (emotion === 'calm'){
        return calm_background[Math.floor(Math.random() * calm_background.length)]
    } else if (emotion === 'happy'){
        return happy_background[Math.floor(Math.random() * happy_background.length)]
    } else if (emotion === 'sad'){
        return sad_background[Math.floor(Math.random() * sad_background.length)]
    } else if (emotion === 'surprised'){
        return surprised_background[Math.floor(Math.random() * surprised_background.length)]
    } else {
        return unknown_emotion[Math.floor(Math.random() * unknown_emotion.length)]
    }
}