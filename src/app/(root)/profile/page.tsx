import { signOut } from "@/auth";
import { BookList } from "@/components";
import { sampleBooks } from "@/constants";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <main className="mx-auto max-w-7xl">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button>Sign out</Button>
      </form>
      <BookList books={sampleBooks} title="Borrowed Books" />
    </main>
  );
};

export default ProfilePage;
