import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type Spaceship } from "@shared/schema";
import SpaceshipForm from "@/components/spaceships/SpaceshipForm";

export default function SpaceshipDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/spaceship/:id");
  const { toast } = useToast();
  const id = params?.id;

  const { data: spaceship, isLoading } = useQuery<Spaceship>({
    queryKey: ["/api/spaceships", id],
    enabled: !!id
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/spaceships/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/spaceships"] });
      setLocation("/");
      toast({
        title: "Success",
        description: "Spaceship deleted successfully"
      });
    }
  });

  if (isLoading) {
    return <div className="p-4"><Skeleton className="h-48 w-full" /></div>;
  }

  if (!spaceship) {
    return <div className="p-4">Spaceship not found</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{spaceship.name}</span>
            <Badge variant={spaceship.status === "Active" ? "default" : "destructive"}>
              {spaceship.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Type</h3>
              <p>{spaceship.type}</p>
            </div>
            <div>
              <h3 className="font-semibold">Class</h3>
              <p>{spaceship.class}</p>
            </div>
            <div>
              <h3 className="font-semibold">Crew</h3>
              <p>{spaceship.crew.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Length</h3>
              <p>{spaceship.length.toLocaleString()} meters</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Weapons</h3>
            <ul className="list-disc list-inside">
              {spaceship.weapons.map((weapon, i) => (
                <li key={i}>{weapon}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Spaceship</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this spaceship? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteMutation.mutate()}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Edit Spaceship</h3>
            <SpaceshipForm spaceship={spaceship} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
