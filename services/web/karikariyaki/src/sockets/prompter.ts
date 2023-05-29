import cookie from "cookie";

// Socket
import { io } from "../setup";

// Routes
import { joinEvent, joinEvents, leaveEvent, leaveEvents } from "./routes";

// Services
import { JWTService, OperatorService } from "@services";

export class PrompterSocket {
    public static namespace = io.of("karikariyaki/ws/prompter");

    public static setup() {
        PrompterSocket.namespace.on("connection", async (socket) => {
            const rawCookies = socket.handshake.headers.cookie;

            if (!rawCookies) {
                return;
            }

            const parsedCookies = cookie.parse(rawCookies);

            const accessToken = parsedCookies[process.env["COOKIE_NAME"]];

            if (!accessToken) {
                return;
            }

            const decodedAccessToken =
                JWTService.decodeAccessToken(accessToken);

            if (!decodedAccessToken || !decodedAccessToken.userName) {
                return;
            }

            const loggedOperator = await OperatorService.queryByUserName(
                decodedAccessToken.userName
            );

            if (!loggedOperator) {
                return;
            }

            /**
             * Events
             */
            joinEvents(socket);
            leaveEvents(socket);

            /**
             * Event
             */
            socket.data.operatorId = loggedOperator._id.toString();
            socket.data.realmId = loggedOperator.realm._id.toString();

            joinEvent(socket);
            leaveEvent(socket);
        });
    }
}
