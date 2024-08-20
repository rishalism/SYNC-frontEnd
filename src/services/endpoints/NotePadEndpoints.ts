const base_url = `/api/notePad`

export enum NOTEPAD_ENDPOINTS {
     CREATE_NOTE = `${base_url}/note/create`,
     GET_NOTES = `${base_url}/note/get`,
     UPDATE_NOTES = `${base_url}/note/update`,
     DELETE_NOTE = `${base_url}/note/delete`
}
