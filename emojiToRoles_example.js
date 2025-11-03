/**
 * Map the id:s of messages we want to track to maps of 
 * emoji names that we want to associate with a role id 
 *
 * "[message id]": {
 *     "[emoji name]": "[role id]"
 * }
 */

const emojiToRoles = {
  "1387426887042732072": {
    "pronoun_he": "1387425529811959848", 
    "pronoun_she": "1387425601530499203",
    "pronoun_they": "1387425637047861431",
    "pronoun_ask": "1387425735202832385",
    "pronoun_any": "1387425682308730980"
  },
  "1433495316727988366": {
    "ping_role": "1433495830916239590"
  }
}

export let EMOJI_TO_ROLES = new Map(
  Object.entries(emojiToRoles).map(([messageId, emojiToRole]) => [
    messageId,
    new Map(Object.entries(emojiToRole)),
  ])
);
