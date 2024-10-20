import React, {useState, useEffect} from "react"; 
import aboutCharacter from "./AboutCharacters"; 


const dummyCharacters = [
    { id: 1, 
        abilityName: "minorIllusion", 
        description: "The ability to create fake stories or gossip that stir up drama without anyone knowing where it came from. Lasts at least 1 minute of in-game time.", 
        image: "../../Images/???", 
        requiredSkill: [dexterity, charisma],
        enemyRequiredToDefend: [intelligence, wisdom],
        rollDie: [20],
        },

    { id: 2, 
        abilityName: "viciousMockery", 
        description: "Classic insults and put-downs. A perfect burn that leaves the target emotionally wrecked but without any real harm. The target must be within hearing distance. If sucessful, the target rolls with disadvantage on the next attack roll they take.", 
        image: "../../Images/???", 
        requiredSkill: [dexterity, charisma],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
            },

    { id: 3,
        abilityName: "charmPerson",
        description: "Ability to turn on the charm when needed, making people feel special and important—until they’re no longer useful. If successful, the target will do anything you ask of them, within reason, for the next 10 minutes of in-game time.",
        image: "../../Images/???",
        requiredSkill: [dexterity, charisma],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 4,
        abilityName: "detectMagic",
        description: "They have an instinct for sniffing out hidden motives or noticing when someone is being deceptive or manipulative.",
        image: "../../Images/???",
        requiredSkill: [intelligence],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 5,
        abilityName: "healingWord",
        description: "A well-placed compliment or show of concern that quickly patches up minor conflicts.. The target will regain 1d4 hit points.",
        image: "../../Images/???",
        requiredSkill: [wisdom],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 6,
        abilityName: "thunderwave",
        description: "A major blow-up or outburst that sends shockwaves through the group, shaking up the social dynamics in a big way. Area of effect is a 15-foot radius. On a successful save, the enemy takes half damage.",
        image: "../../Images/???",
        requiredSkill: [dexterity, charisma],
        enemyRequiredToDefend: [constitution],
        rollDie: [20],
        },

    { id: 7,
        abilityName: "guidance",
        description: "This character can offer just the right advice or encouragement to give someone an edge in a tricky social situation. A pep talk before a big event, or telling someone exactly what they need to hear to make the best impression. The target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check.",
        image: "../../Images/???",
        requiredSkill: [wisdom],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 8,
        abilityName: "mending",
        description: "Skilled in fixing broken relationships or minor social faux pas—usually with just the right words or a well-timed apology. The target will regain 1d4 hit points.",
        image: "../../Images/???",
        requiredSkill: [intelligence],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 9,
        abilityName: "bless",
        description: "A character with this power can boost the confidence of their friends or allies. They offer compliments or motivational words that make others feel invincible, increasing their success in social or personal challenges. Your target can roll with advantage for the next minute in game time.",
        image: "../../Images/???",
        requiredSkill: [wisdom],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 10,
        abilityName: "shieldOfFaith",
        description: "A protective aura of confidence or reputation that makes attacks (verbal, social, emotional) less effective. The character might have a strong fan base or loyal group of friends who defend them, making it harder for anyone to successfully damage their image. Grants a +2 bonus to saving throws for 10 minutes in game.",
        image: "../../Images/???",
        requiredSkill: [wisdom],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 11,
        abilityName: "guidingBolt",
        description: "A well-aimed statement or piece of gossip that completely exposes someone, shining a light on their flaws, secrets, or lies. This attack leaves the target vulnerable, and the entire group can take advantage of this newly revealed weakness. On a hit, the target takes 4d6 radiant damage, and the next attack roll made against this target before the end of your next turn has advantage.",
        image: "../../Images/???",
        requiredSkill: [wisdom],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 12,
        abilityName: "intimidation",
        description: "Harness your fierce attitude and commanding presence to dominate any confrontation. With sharp words, piercing stares, and unshakable confidence, you can silence your opponents and sway the room's energy in your favor. If successful, the target will do anything you ask of them, within reason, for the next 10 minutes of in-game time.",
        image: "../../Images/???",
        requiredSkill: [dexterity, charisma],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 13,
        abilityName: "attack",
        description: "When words aren't enough, escalate the situation with dramatic gestures, quick comebacks, or even physicality. Whether it's throwing shade, hurling insults, or tossing an actual glass, this move is about taking the conflict to the next level. If successful, the target will take damage equal to your dice roll.",
        image: "../../Images/???",
        requiredSkill: [dexterity, charisma],
        enemyRequiredToDefend: [constitution],
        rollDie: [20],
        },

    { id: 14,
        abilityName: "duel",
        description: "The character excels in one-on-one confrontations. They thrive in direct confrontations, where they can focus all their energy on a single person, verbally overpowering them and always coming out on top in head-to-head battles. If the target accepts, you will both roll a d20. The higher roll wins. If you win, the target will take half the damage of your dice roll.",
        image: "../../Images/???",
        requiredSkill: [dexterity, charisma],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 15,
        abilityName: "twoHandedWeapon",
        description: "This style fits someone who uses massive verbal attacks or drama bombs that cause shockwaves. They are known for huge, dramatic blow-ups that leave a lasting impact, whether it’s revealing a massive secret or making a major scene in front of a crowd.",
        image: "../../Images/???",
        requiredSkill: [strength],
        enemyRequiredToDefend: [constitution],
        rollDie: [20],
        },

    { id: 16,
        abilityName: "investigation",
        description: "Use your network, intuition, and a little snooping to get to the bottom of rumors, shady behavior, or hidden alliances. Whether through casual gossip, social media stalking, or calling in favors from mutual acquaintances, the goal is to uncover information others want hidden.",
        image: "../../Images/???",
        requiredSkill: [intelligence],
        enemyRequiredToDefend: [intelligence],
        rollDie: [20],
        },

    { id: 17,
        abilityName: "actionSurge",
        description: "The ability to take an additional action on your turn. This action can be used to attack or use an ability.",
        image: "../../Images/???",
        requiredSkill: [dexterity, charisma],
        enemyRequiredToDefend: [constitution],
        rollDie: [20],
        },

    { id: 18,
        abilityName: "sneakAttack",
        description: "This translates into a character’s ability to strike when their target is least expecting it. Socially, they might use a well-timed insult, expose a secret, or deliver a verbal jab just as the other person’s guard is down. The sneak attack works best in a one-on-one conversation or a small group where they can take someone by surprise. If successful, the target will take additional damage equal to your sneak attack dice roll.",
        image: "../../Images/???",
        requiredSkill: [dexterity],
        enemyRequiredToDefend: [dexterity],
        rollDie: [20],
        },

    { id: 19,
        abilityName: "thevesCant",
        description: "The character’s ability to communicate in code, using subtle innuendos, looks, or gestures that only a select few understand. It’s how they might speak in front of the whole group but say things that only their closest allies (or those in the know) will pick up on.",
        image: "../../Images/???",
        requiredSkill: [intelligence],
        enemyRequiredToDefend: [intelligence],
        rollDie: [20],
        },

    { id: 20,
        abilityName: "disguise",
        description: "Master the art of hiding your emotions, downplaying drama, or even keeping secrets about your own life. Whether it’s pretending to be someone’s friend while plotting against them, masking your financial struggles, or playing innocent in a heated argument, this skill lets you manipulate situations while keeping your true agenda hidden.",
        image: "../../Images/???",
        requiredSkill: [dexterity],
        enemyRequiredToDefend: [intelligence],
        rollDie: [20],
        },

    { id: 21,
        abilityName: "cunningAction",
        description: "This ability represents their talent for quick, evasive social maneuvers. A character with Cunning Action can get out of sticky situations, shift the conversation, or make a quick exit from an argument before things turn against them. Dodge Arguments: If an argument is about to turn against them, they know how to escape or deflect by changing the subject, leaving the room, or pulling a distraction to avoid facing the heat. Turn the Tables: If they’re backed into a corner, they can quickly shift the blame or redirect the attack onto someone else, taking the heat off themselves. Make an Escape: They always have an exit strategy ready—whether it’s walking out of a heated dinner or disappearing from a conversation at just the right moment before things get too tense. ",
        image: "../../Images/???",
        requiredSkill: [dexterity],
        enemyRequiredToDefend: [dexterity],
        rollDie: [20],
        },

    { id: 22,
        abilityName: "sleightOfHand",
        description: "Perfect the art of subtly manipulating situations, slipping information, or even pulling off physical gestures unnoticed during dramatic confrontations. Whether it’s secretly passing a note, slipping something into someone’s purse, or quietly signaling to an ally during a heated discussion, this skill covers all the sneaky moves that can change the game without anyone realizing.",
        image: "../../Images/???",
        requiredSkill: [dexterity],
        enemyRequiredToDefend: [dexterity],
        rollDie: [20],
        },

    { id: 23,
        abilityName: "poison",
        description: "This skill is all about slowly but surely “poisoning” someone's social life or reputation. It involves subtle manipulation, spreading rumors, planting seeds of doubt, or influencing others to turn against a target. The poison here is metaphorical—emotional and psychological damage, rather than physical harm. If successful the target will take damage equal to your poison damage dice.",
        image: "../../Images/???",
        requiredSkill: [dexterity],
        enemyRequiredToDefend: [constitution],
        rollDie: [20],
        },

    { id: 24,
        abilityName: "light",
        description: "magnetic presence, always shining the spotlight on themselves in any social gathering. They attract attention effortlessly. Can be used to blind a target or illuminate a situation.",
        image: "../../Images/???",
        requiredSkill: [intelligence],
        enemyRequiredToDefend: [wisdom],
        rollDie: [20],
        },

    { id: 25,
        abilityName: "mageHand",
        description: "Perfect for manipulating things (or people) from a distance. They could subtly influence a situation without getting directly involved.",
        image: "../../Images/???",
        requiredSkill: [intelligence],
        enemyRequiredToDefend: [intelligence],
        rollDie: [20],
        },

    { id: 26,
        abilityName: "RayofFrost",
        description: "This translates into emotionally freezing someone out. They can give the cold shoulder, creating a frosty atmosphere where the target feels isolated and cut off from the group. It’s the silent treatment, the chill in the room that makes everyone else uncomfortable. On a hit, the target takes 1d8 damage, and its speed is reduced by 10 feet until the start of your next turn.",
        image: "../../Images/???",
        requiredSkill: [intelligence],
        enemyRequiredToDefend: [constitution],
        rollDie: [20],
        },

    { id: 27,
        abilityName: "shield",
        description: "The ability to deflect incoming criticism or attacks. They are masters at building up defenses on the fly, using quick excuses, counterattacks, or charm to shield themselves from the worst social blows. If someone tries to take them down, they raise a barrier and brush off the insults with ease.",
        image: "../../Images/???",
        requiredSkill: [intelligence],
        enemyRequiredToDefend: [intelligence],
        rollDie: [20],
        },

    { id: 28,
        abilityName: "magicMissle",
        description: "The character’s ability to deliver rapid-fire verbal attacks that are impossible to dodge. When they want to take someone down, they unleash multiple insults or revelations in quick succession, each one hitting its mark. It’s a well-coordinated attack where each point lands. It deals 1d4 + 1 damage to its target.",
        image: "../../Images/???",
        requiredSkill: [intelligence],
        enemyRequiredToDefend: [intelligence],
        rollDie: [20],
        },
    
  ];

