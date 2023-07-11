import { FaceDetail } from "aws-sdk/clients/rekognition";

export function responseToPrompt(faceDetails: FaceDetail) {
  // list of background with angry tone
  const angry_background = [
    "hellish fire",
    "fiery volcano with lava",
    "sinister cave",
    "apocalyptic city scape",
    "dark stygian forest",
    "war zone",
    "red-hued skyline",
    "mars landscape"
  ];
  const calm_background = [
    "serene beach sunset",
    "zen garden",
    "misty mountain lake",
    "peaceful forest clearing",
    "calming pastel sky",
    "lake side",
  ];
  const happy_background = [
    "beach",
    "sunny field of flowers",
    "joyful crowds",
    "festive events",
    "carnival",
    "bali temples"
  ];
  const sad_background = [
    "rainy window",
    "snow blizzard",
    "deserted pier",
    "old cemetery",
    "inside a cave",
  ];
  const surprised_background = ["zoo", "birthday party", "exploding colors"];
  const unknown_emotion = ["abstract shapes", "mysterious door", "outer space"];

  const negative_prompt_list = [];
  const prompt_list = [];

  const ageRange = faceDetails.AgeRange;
  const beard = faceDetails.Beard;
  const emotions = faceDetails.Emotions;
  const eyeglasses = faceDetails.Eyeglasses;
  const gender = faceDetails.Gender;
  const mustache = faceDetails.Mustache;
  const mouthOpen = faceDetails.MouthOpen;
  const smile = faceDetails.Smile;
  const sunglasses = faceDetails.Sunglasses;

  // Calculate the mean of the age range
  const age = ageRange?.High;
  prompt_list.push(age);
  beard?.Value ? prompt_list.push("beard") : negative_prompt_list.push("beard");

  // Determine if the person wears eyeglasses. add to prompt_list if true, add to negative prompt_list if false
  eyeglasses?.Value ? prompt_list.push("eyeglasses") : negative_prompt_list.push("eyeglasses");

  // Get the gender of the person
  const personGender = gender?.Value;
  prompt_list.push(personGender);

  // Determine if the person is smiling
  smile?.Value ? prompt_list.push("smiling") : negative_prompt_list.push("smiling");

  // Determine if the person has their mouth open
  mouthOpen?.Value
    ? prompt_list.push("mouth open")
    : negative_prompt_list.push("mouth open");

  // Determine if the person uses sunglasses
  sunglasses?.Value
    ? prompt_list.push("using sunglasses")
    : negative_prompt_list.push("using sunglasses");

  mustache?.Value ? prompt_list.push("mustache") : negative_prompt_list.push("mustache");

  // randomizer for every type of emotions (array)
   // Find the first value of emotion
   const emotion = emotions?.[0].Type?.toLowerCase();

  if (emotion === "angry") {
    // pick random angry background
    prompt_list.push(
      `background of realistic ${
        angry_background[Math.floor(Math.random() * angry_background.length)]
      }`
    );
  } else if (emotion === "calm") {
    prompt_list.push(
      `background of realistic ${
        calm_background[Math.floor(Math.random() * calm_background.length)]
      }`
    );
  } else if (emotion === "happy") {
    prompt_list.push(
      `background of realistic ${
        happy_background[Math.floor(Math.random() * happy_background.length)]
      }`
    );
  } else if (emotion === "sad") {
    prompt_list.push(
      `background of realistic ${
        sad_background[Math.floor(Math.random() * sad_background.length)]
      }`
    );
  } else if (emotion === "surprised") {
    prompt_list.push(
      `background of realistic ${
        surprised_background[
          Math.floor(Math.random() * surprised_background.length)
        ]
      }`
    );
  } else {
    prompt_list.push(
      `background of realistic ${
        unknown_emotion[Math.floor(Math.random() * unknown_emotion.length)]
      }`
    );
  }

  // convert prompt_list and negative_prompt_list to string separated with comma
  const prompt = prompt_list.join(', ')
  const negative_prompt = negative_prompt_list.join(', ')
  
  return { prompt, negative_prompt }
}
