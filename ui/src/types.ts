export enum DamageType {
    ACID = 'acid',
    BLUDGEONING = 'bludgeoning',
    COLD = 'cold',
    FIRE = 'fire',
    FORCE = 'force',
    LIGHTNING = 'lightning',
    NECROTIC = 'necrotic',
    PIERCING = 'piercing',
    POISON = 'poison',
    PSYCHIC = 'psychic',
    RADIANT = 'radiant',
    SLASHING = 'slashing',
    THUNDER = 'thunder',
}

export enum DefenseType {
    IMMUNITY = 'immunity',
    RESISTANCE = 'resistance',
}

export interface IClass {
    name: string;
    hitDiceValue: number;
    classLevel: number;
}

export interface IStats {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface IItem {
    name: string;
    modifier: {
        affectedObject: string;
        affectedValue: string;
        value: number;
    };
}

export interface IDefense {
    type: DamageType;
    defense: DefenseType;
}

export interface ICharacter {
    id: string;
    name: string;
    slug: string;
    level: number;
    hitPoints: number;
    currentHp: number;
    tempHp: number;
    classes: IClass[];
    stats: IStats;
    items: IItem[];
    defenses: IDefense[];
    isAlive: boolean;
}
