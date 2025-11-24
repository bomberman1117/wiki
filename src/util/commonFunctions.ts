export const getColor = (type: number): any => {
    switch (type){
        case -1: 
            return null
        case 1:
            return {
                name: "Vanilla",
                color: "#E4DBCE"
            }
        case 2:
            return {
                name: "Loving",
                color: "#FFA6C7"
            };
        case 3:
            return {
                name: "Muscle",
                color: "#F0AA64"
            }
        case 4:
            return {
                name: "Control",
                color: "#697BE2"
            }
        case 5:
            return {
                name: "Instinct",
                color: "#FF8166"
            }
        case 6:
            return {
                name: "Toy",
                color: "#80E3B4"
            }
        case 7:
            return {
                name: "Freak",
                color: "#9D7FE5"
            }
        case 8:
            return {
                name: "Spoiled",
                color: "#7AD9FB"
            }
        case 9:
            return {
                name: "Group",
                color: "#A6D276"
            }
        case 10:
            return {
                name: "Pathetic",
                color: "#FFE279"
            }
        case 11:
            return {
                name: "Tentacle",
                color: "#D17DC5"
            }
        case 12:
            return {
                name: "Stoic",
                color: "#AE7F6A"
            }
        case 13:
            return {
                name: "Rage",
                color: "#E85761"
            }
        default:
            return {
                    name: "Unknown", 
                    color: "black"
                };
    }
}
export const titleize = (input: string): string => {
    return input.charAt(0).toLocaleUpperCase() + input.substring(1)
}
export const getStatNames = () => {
    if(import.meta.env.SAFE_MODE)
        return ["Stamina", "Phs ATK", "Phs DEF", "Speed", "Spc ATK", "Spc DEF"]
    return ["Stamina", "Top ATK", "Top DEF", "Speed", "Bot ATK", "Bot DEF"]
}