import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "./Button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const DialogComponents = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary" label="Open Dialog" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="typography-title-s text-gray-800">
              Edit profile
            </DialogTitle>
            <DialogDescription className="typography-body-m text-gray-600">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="secondary"
                label="Cancel"
                className="typography-subtitle-s"
              />
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="primary"
                label="Save changes"
                className="typography-subtitle-s"
              />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DialogComponents;
