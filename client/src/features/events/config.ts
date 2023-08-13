import { Link } from "react-router-dom";

// This is the common name use throughout the feature
// It is used to make api calls, as component variable names and for UI presentation
export const appName = 'events';
// Component type is either 'main', 'parent', or 'child' (for now)
export const featureType = 'main';
// Is this component a parent?
export const isParent = true;
// Component to redirect to when view button are clicked
export const redirectFeature = 'participants';
// Presentation type refers to how the data will be displayed
// Options are 'datatable' or 'cards' (for now)
export const presentationType = 'cards';
// Default data is used to initialize a record and also to default it so it will clear the form
export const defaultData = {
    name: "",
    description: "",
    date: "",
    owner: "",    
};
// Table columns are used when datatable is selected
export const tableColumns = [{
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "30%",
    editable: true,
    // ellipsis: true,
},
{
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "30%",
    editable: true,
    ellipsis: true,
},
{
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "30%",
    editable: true,
    // ellipsis: true,
}];
// Form inputs are used for create and update forms. All required inputs should be listed here.
export const formInputs = [{name: 'name', type: 'text', options: []}, {name: 'description', type: 'text', options: []}, {name: 'date', type: 'date', options: []}];