let abilitiesArray=[]

const addToForms=()=>{
    tableElement = abilitiesArray.reduce((acc,value,index)=>{
        return (acc+`<tr>
                        <td>&bull;</td>
                        <td>${value.ability}<input type="hidden" name="ability${index+1}" value="${value.ability}"></td>
                        <td>${value.skillLevel}<input type="hidden" name="skillLevel${index+1}" value="${value.skillLevel}"></td>
                        <td><button class="clear" type="button" id="ability${index+1}" onClick="handleDelete(${index})">&#10060;</button></td>
                    </tr>`)
    },"")
    abilities.innerHTML=tableElement
}

const checkList = (value)=>{
    let tempArray= abilitiesArray.map((value)=>value.ability)
    let index = tempArray.indexOf(value.toLowerCase());
    console.log(index)
    return index;
}

const handleTFoot=(value)=>{
    if(value ==="pending"){
        tfoot.innerHTML=`<tr>
                            <td></td>
                            <td>
                                <input type="text" name="ability" id="abilitiesInput" placeholder="ability">
                            </td>
                            <td>
                                <select name="skillLevelInput" id="skillLevelInput">
                                    <option value="novice">Novice</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                    <option value="expert">Expert</option>
                                </select>
                            </td>
                            <td>
                                <button class="clear" type="button" id="addAbilities">
                                    <span class="half" onClick="handleAbilities()">&#9989;</span>
                                    <span class="half" onClick="handleTFoot('added')">&#10060;</span>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colspan="3"><p class="smalltext" id="alertAbility"></p></td>
                        </tr>
                        `
    }else if(value==="added"){
        tfoot.innerHTML=`<tr>
                            <td></td>
                            <td colspan="3">
                                <button type="button" id="abilityBtn" onClick="handleTFoot('pending')">Add More</button>
                            </td>
                        </tr>`
    }
}

const handleAbilities=_=>{
    let ability = abilitiesInput.value.toLowerCase();
    // to check if empty
    if(ability==""){
        return alertAbility.innerHTML='please input a value'
    }
    //to check against repeating values
    if(checkList(ability) !== -1){
        return alertAbility.innerHTML=`cannot add list because "${ability}" already exists in line ${checkList(ability)+1}`
        
    }

    let skillLevel = skillLevelInput.value.toLowerCase();
    abilitiesArray=[...abilitiesArray,{ability,skillLevel}]
    addToForms()

    handleTFoot("added")
}

const handleDelete = (index) =>{
    abilitiesArray.splice(index,1);
    addToForms()    
}