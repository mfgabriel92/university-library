import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import config from "@/lib/config";

const { publicKey, privateKey, urlEndpoint } = config.env.imageKit;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
