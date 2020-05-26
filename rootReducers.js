
const intialState={
    condition_btn:true,
    enable_condition:true
};
 export default function condition(state=intialState,action){
    switch(action.type){
        case 'CONDITION_BTN': 
        return Object.assign({},state,{
                condition_btn: !state.condition_btn,
            })
        case 'ENABLE_CONDITION':
            return Object.assign({},state,{
                enable_condition: !state.enable_condition,
            })

        default:
            return state;
    }
}





