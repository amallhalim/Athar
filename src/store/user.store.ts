import { create } from "zustand";



interface User {
    name:string,
    age:number,

}
interface UserStore  {
    user:User ,
    setUser:(user:User )=>void
}


const useUser = create<UserStore  >((set) => ({
  user: {
    name:"",
    age:0,
  },
  setUser: (user:User) => set({ user }),
}));

export default useUser;