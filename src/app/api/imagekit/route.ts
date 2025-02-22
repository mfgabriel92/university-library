import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import config from "@/lib/config";

const { publicKey, privateKey, urlEndpoint } = config.env.imageKit;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export const GET = async () => {
  return NextResponse.json(imagekit.getAuthenticationParameters());
};
