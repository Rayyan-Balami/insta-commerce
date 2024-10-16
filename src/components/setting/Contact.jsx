import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/schemas/contact";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setContact } from "@/store/storeSlice";
import StoreService from "@/appwrite/store";
import { toast } from "sonner";

export default function Contact() {
  const storeContact = useSelector((state) => state.store.contact);
  const dispatch = useDispatch();
  const defaultValues = {
    email1: storeContact.email1 || "",
    email2: storeContact.email2 || "",
    tel1: storeContact.tel1 || "",
    tel2: storeContact.tel2 || "",
  };
  console.log(defaultValues);
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      const response = await StoreService.updateContact(storeContact.$id, data);
      if (response.success) {
        dispatch(setContact(response.result));
        localStorage.setItem("storeContact", JSON.stringify(response.result));
        toast.success("Contact settings updated successfully.");
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="bg-muted/40 max-w-2xl">
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="email1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="business@email.com" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tel1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="98XXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tel2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage className="font-light" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >

              {form.formState.isSubmitting && <Loader className="size-4 mr-2 animate-spin" />}
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
