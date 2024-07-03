import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

const worker = setupWorker(
  http.get("/api/data", ({ request }) => {
    console.log("request", request);
    const data = window.localStorage.getItem("imageData");
    // console.log("check data", data);
    return HttpResponse.json(data);
  }),
  http.put("/api/data", ({ request, params, cookies }) => {
    console.log("request", request);
    // const newData = JSON.stringify(request);
    // window.localStorage.setItem("imageData", newData);
    return HttpResponse.json({
      message: "success",
    });
  })
);

worker.start();
