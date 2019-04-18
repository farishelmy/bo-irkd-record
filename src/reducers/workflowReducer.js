import {
  LIST_WORKFLOW,
  POPULATE_WORKFLOW,
  WORKFLOW_TEMPLATE,
  SET_CARD_VIEW,
  // CHANGE_ISMULTI,
  WORKFLOW_SEL,
  SHOW_FAB,
  // LIST_ACTIVITY_DETAIL,
  SELECT_SEL,
  WIZARD_PAGE,
  SET_CONTAINER_LINE,
  // LIST_ACTIVITY,
  SET_RECORD_STORE,
  WORKFLOW_NAME,
  PAGE_SIZE,
  TOTAL_COUNT,
  PANEL_CONTENT,
  SHOW_SUB_BTN,
  ACTIVITY_DETAIL,
  SHOW_MODAL_SEARCH,
  WORKFLOW_SEARCH_PARAM,
  SET_SHOW_CREATE_WF
} from "../actions/types";

const initialState = {
  listWorkflowTemplate: [],
  workflowTemplate: null,
  listWorkflow: [],
  wrkflSel: null, //URI
  workflowName: null, //Name
  workflowDetails: [],
  wizardPage: "general",
  containerLine: true,
  // listActivity:[],
  recordStore: [],
  pageSize: null,
  totalCount: null,
  panelContent: true,
  // showFab:false,
  cardView: true,
  isSel: false,
  showSearchModal: false,
  workflowSearchParam: null
  // showSubBtn:false,
  // isMultiSel:false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIST_WORKFLOW:
      return {
        ...state,
        listWorkflowTemplate: action.payload
      };

    case WORKFLOW_TEMPLATE:
      return {
        ...state,
        workflowTemplate: action.payload
      };

    case WORKFLOW_NAME:
      return {
        ...state,
        workflowName: action.payload
      };

    case POPULATE_WORKFLOW:
      return {
        ...state,
        listWorkflow: action.payload
      };

    case ACTIVITY_DETAIL:
      return {
        ...state,
        workflowDetails: action.payload
      };

    // case LIST_ACTIVITY:
    // return {
    //     ...state,
    //     listActivity:action.payload
    // }

    case SET_RECORD_STORE:
      return {
        ...state,
        recordStore: action.payload
      };

    case WIZARD_PAGE:
      return {
        ...state,
        wizardPage: action.payload
      };

    case SET_CONTAINER_LINE:
      return {
        ...state,
        containerLine: action.payload
      };

    case SET_CARD_VIEW:
      return {
        ...state,
        cardView: action.payload
      };
    // case CHANGE_ISMULTI:
    // return {
    //     ...state,
    //     isMultiSel:action.payload
    // }
    case WORKFLOW_SEL:
      return {
        ...state,
        wrkflSel: action.payload
      };
    case SHOW_FAB:
      return {
        ...state,
        showFab: action.payload
      };

    case SELECT_SEL:
      return {
        ...state,
        isSel: action.payload
      };

    case PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload
      };

    case TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload
      };

    case PANEL_CONTENT:
      return {
        ...state,
        panelContent: action.payload
      };

    case SHOW_SUB_BTN:
      return {
        ...state,
        showSubBtn: action.payload
      };

    case SHOW_MODAL_SEARCH:
      return {
        ...state,
        showSearchModal: action.payload
      };

    case WORKFLOW_SEARCH_PARAM:
      return {
        ...state,
        workflowSearchParam: action.payload
      };
    default:
      return state;
  }
}
