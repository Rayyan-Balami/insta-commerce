import PageTitle from "@/components/PageTitle";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalSchema } from "@/schemas/general";
import { Form } from "@/components/ui/form";
import CheckoutForm from "@/components/product/checkout/CheckoutForm";

function Checkout() {
  const form = useForm();
  const onSubmit = async (data) => {
    // Simulate asynchronous submission (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data); // Handle form submission logic here
    //reset the form
    form.reset();
  };
  return (
    <>
      <FormProvider {...form}>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <PageTitle title="Checkout" />
        <CheckoutForm />
      </form>
      </Form>
      </FormProvider>
    </>
  );
}

export default Checkout;
