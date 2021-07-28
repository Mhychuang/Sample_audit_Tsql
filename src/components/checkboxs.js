import React, { useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


export default function CheckboxLabels(props) {
//   const [state, setState] = React.useState({
//     id:'3',
//     VotingEquipmentUsed: []

//   })
  

//   const handleChange = (event) => {
//     let updatedList = state.VotingEquipmentUsed
//     if (event.target.checked){
//         updatedList.push(event.target.name)
     
//         }
//     else{
//         console.log('false', event.target.name)
//         updatedList = updatedList.filter(e => e !== event.target.name)
//         console.log('updatedList', updatedList)
//     }
    
//     setState({VotingEquipmentUsed: updatedList})
    
//     }
    
//     useEffect(() => {
        
//         console.log('checkboxstate', state.VotingEquipmentUsed)
//       }, [state]);
        


  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            //checked={state.M100_tabulator}
            onChange={props.onCheckBoxChange}
            name="M100_tabulator"
            color="primary"
          />
          
        }
        label="M100 tabulator"
      />
    <FormControlLabel
        control={
          <Checkbox
            //checked={state.DS200_tabulator}
            onChange={props.onCheckBoxChange}
            name="DS200_tabulator"
            color="primary"
          />
          
        }
        label="DS200 tabulator"
      />

    <FormControlLabel
        control={
          <Checkbox
            //checked={state.D650_central_tabulator}
            onChange={props.onCheckBoxChange}
            name="D650_central_tabulator"
            color="primary"
          />
          
        }
        label="D650 central tabulator"
      />

    <FormControlLabel
        control={
          <Checkbox
            //checked={state.DS_850_central_tabulator}
            onChange={props.onCheckBoxChange}
            name="DS_850_central_tabulator"
            color="primary"
          />
          
        }
        label="DS 850 central tabulator"
      />

    <FormControlLabel
        control={
          <Checkbox
            //checked={state.iVotronic_touchscreen_machines}
            onChange={props.onCheckBoxChange}
            name="iVotronic_touchscreen_machines"
            color="primary"
          />
          
        }
        label="iVotronic touchscreen machines"
      />    
    
    </FormGroup>
  );
}
