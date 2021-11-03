import { io, Socket } from 'socket.io-client';

class AdminService {
    
    private socket: Socket;

    public connect(updateList:Function) : void{
        this.socket=io("http://localhost:4000");
        this.socket.on("admin-change-something",()=>{ updateList() })
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const adminService = new AdminService();

export default adminService;