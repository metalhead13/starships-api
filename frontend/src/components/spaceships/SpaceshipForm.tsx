import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  type InsertSpaceship, 
  type Spaceship,
  insertSpaceshipSchema, 
  spaceshipTypes, 
  spaceshipClasses,
  spaceshipStatuses 
} from "@shared/schema";

interface SpaceshipFormProps {
  spaceship?: Spaceship;
}

export default function SpaceshipForm({ spaceship }: SpaceshipFormProps) {
  const { toast } = useToast();
  const isEditing = !!spaceship;

  const form = useForm<InsertSpaceship>({
    resolver: zodResolver(insertSpaceshipSchema),
    defaultValues: spaceship || {
      weapons: []
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertSpaceship) => {
      if (isEditing) {
        await apiRequest("PATCH", `/api/spaceships/${spaceship.id}`, data);
      } else {
        await apiRequest("POST", "/api/spaceships", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/spaceships"] });
      if (isEditing) {
        queryClient.invalidateQueries({ 
          queryKey: ["/api/spaceships", spaceship.id.toString()]
        });
      }
      form.reset();
      toast({
        title: "Success",
        description: `Spaceship ${isEditing ? "updated" : "created"} successfully`
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {spaceshipTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {spaceshipClasses.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="crew"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crew Size</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Length (meters)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weapons"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weapons (comma-separated)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  value={field.value.join(", ")}
                  onChange={e => field.onChange(e.target.value.split(",").map(w => w.trim()))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {spaceshipStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : (isEditing ? "Update" : "Create")} Spaceship
        </Button>
      </form>
    </Form>
  );
}
