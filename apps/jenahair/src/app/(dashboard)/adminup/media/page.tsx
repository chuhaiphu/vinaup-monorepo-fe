import { redirect } from "next/navigation";
import { Route } from "next";

export default function AdminMediaPage() {
  redirect('/adminup/media/upload' as Route);
}