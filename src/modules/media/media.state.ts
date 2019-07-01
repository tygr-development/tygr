export interface MediaState {
  title: string;
  imgUrl: string;
  vidUrl: string;
}

export const initialState: MediaState = {
  imgUrl: '',
  title: '',
  vidUrl: '',
};
