"use client";

import { useEffect, useState, use, useRef } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import ModuleForm from "@/components/module-form";
import SubjectForm from "@/components/subject-form";
import { fetchAFOSWithModulesAndSubjects } from "@/actions/fetchAfosWithModulesAndSubjects";
import { AFOSDetailsModuleAndSubjectType } from "@/types/AFOSDetailsModuleAndSubjectType";
import Loader from "@/components/loader";
import ErrorMessage from "@/components/errorMessage";
import { deleteModule } from "@/actions/module";
import { toast } from "sonner";

export default function ModulesAndSubjectsPage({
  params,
}: {
  params: Promise<{ afosCode: string }>;
}) {
  const { afosCode } = use(params);
  const [AFOS, setAFOS] = useState<AFOSDetailsModuleAndSubjectType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    new Set()
  );
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isEditModuleOpen, setIsEditModuleOpen] = useState<number | null>(null);
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isEditSubjectOpen, setIsEditSubjectOpen] = useState<string | null>(
    null
  );

  async function getAllData(afosCode: string) {
    try {
      const response = await fetchAFOSWithModulesAndSubjects({ afosCode });
      if (response.ok) {
        setAFOS(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Failed to get data.");
    }
  }

  useEffect(() => {
    getAllData(afosCode);
  }, [afosCode]);

  function toggleModule(moduleId: number) {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <ErrorMessage error={error} />
          ) : (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                  {AFOS?.name} ({AFOS?.level})
                </h1>

                {/* Add Module Button */}
                <Dialog
                  open={isAddModuleOpen}
                  onOpenChange={setIsAddModuleOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus />
                      Add Module
                    </Button>
                  </DialogTrigger>
                  {AFOS && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add module</DialogTitle>
                        <DialogDescription>
                          Fill in the details below to add a new module.
                        </DialogDescription>
                      </DialogHeader>
                      <ModuleForm
                        id={0}
                        mode="add"
                        moduleNumber={AFOS.modules.length + 1}
                        afosCode={afosCode}
                        setModuleOpen={setIsAddModuleOpen}
                        getAllData={() => getAllData(afosCode)}
                      />
                    </DialogContent>
                  )}
                </Dialog>
              </div>
              {/* Modules List */}
              <div className="space-y-4">
                {AFOS &&
                  AFOS.modules
                    .slice()
                    .sort((a, b) => a.number - b.number)
                    .map((module) => {
                      const isExpanded = expandedModules.has(module.id);
                      const moduleSubjects = module.subjects;
                      return (
                        <div
                          key={module.id}
                          className="border rounded-lg bg-background shadow-sm"
                        >
                          <div className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3 flex-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleModule(module.id)}
                                className="p-1 h-8 w-8"
                              >
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                              <div className="flex-1">
                                <span className="text-lg font-semibold">
                                  {module.name}
                                </span>
                                <div className="flex items-center gap-4 mt-2">
                                  <Badge variant="outline">
                                    {moduleSubjects.length} subject
                                    {moduleSubjects.length !== 1 ? "s" : ""}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Dialog
                                open={isEditModuleOpen === module.id}
                                onOpenChange={(open) =>
                                  setIsEditModuleOpen(open ? module.id : null)
                                }
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      setIsEditModuleOpen(module.id)
                                    }
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Module</DialogTitle>
                                    <DialogDescription>
                                      Update the details of the module below.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <ModuleForm
                                    mode="edit"
                                    moduleNumber={module.number}
                                    afosCode={afosCode}
                                    initialData={module}
                                    id={module.id}
                                    setModuleOpen={() =>
                                      setIsEditModuleOpen(null)
                                    }
                                    getAllData={() => getAllData(afosCode)}
                                  />
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Module
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete &quot;
                                      {module.name}
                                      &quot;? This will also delete all subjects
                                      within this module. This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => {
                                        async function deleteCurrentModule() {
                                          try {
                                            const response = await deleteModule(
                                              module.id
                                            );

                                            if (response.ok) {
                                              toast.success(
                                                `${module.name} deleted successfully`
                                              );
                                            } else {
                                              toast.error(response.message);
                                            }
                                          } catch (error) {
                                            console.error(error);
                                            toast.error(
                                              "Failed to delete module"
                                            );
                                          } finally {
                                            getAllData(afosCode);
                                          }
                                        }
                                        return deleteCurrentModule();
                                      }}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                          <SlideDown show={isExpanded}>
                            <div className="pt-0 px-4 pb-4">
                              <Separator className="mb-4" />
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">Subjects</h4>
                                  <Dialog
                                    open={isAddSubjectOpen}
                                    onOpenChange={setIsAddSubjectOpen}
                                  >
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Subject
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          Add Subject to {module.name}
                                        </DialogTitle>
                                        <DialogDescription>
                                          Fill in the details below to add a new
                                          subject to this module.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <SubjectForm
                                        moduleId={module.id}
                                        mode="add"
                                        setSubjectOpen={() =>
                                          setIsAddSubjectOpen(false)
                                        }
                                        getAllData={() => getAllData(afosCode)}
                                      />
                                    </DialogContent>
                                  </Dialog>
                                </div>
                                {moduleSubjects.length === 0 ? (
                                  <div className="text-center py-8 text-muted-foreground">
                                    <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                    <p>No subjects added yet</p>
                                    <p className="text-sm">
                                      Click &quot;Add Subject&quot; to get
                                      started
                                    </p>
                                  </div>
                                ) : (
                                  <div className="grid gap-3">
                                    {moduleSubjects.map((subject) => (
                                      <div
                                        key={subject.code}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                      >
                                        <div className="flex-1 flex">
                                          <h5 className="font-medium">
                                            {subject.name}
                                          </h5>
                                          <div className="px-2">
                                            <Separator orientation="vertical" />
                                          </div>
                                          <p className="text-gray-500">
                                            Instructor:{" "}
                                            {subject.users?.firstName}{" "}
                                            {subject.users?.middleInitial
                                              ? `${subject.users.middleInitial}. `
                                              : ""}
                                            {subject.users?.lastName}
                                          </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                          <Dialog
                                            open={
                                              isEditSubjectOpen === subject.code
                                            }
                                            onOpenChange={(open) =>
                                              setIsEditSubjectOpen(
                                                open ? subject.code : null
                                              )
                                            }
                                          >
                                            <DialogTrigger asChild>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                  setIsEditSubjectOpen(
                                                    subject.code
                                                  )
                                                }
                                              >
                                                <Edit className="h-4 w-4" />
                                              </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                              <DialogHeader>
                                                <DialogTitle>
                                                  Edit Subject
                                                </DialogTitle>
                                                <DialogDescription>
                                                  Update the details of the
                                                  subject below.
                                                </DialogDescription>
                                              </DialogHeader>
                                              <SubjectForm
                                                initialData={subject}
                                                moduleId={subject.moduleId}
                                                mode="edit"
                                                setSubjectOpen={() =>
                                                  setIsEditSubjectOpen(null)
                                                }
                                                getAllData={() =>
                                                  getAllData(afosCode)
                                                }
                                              />
                                            </DialogContent>
                                          </Dialog>
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <Button variant="ghost" size="sm">
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                  Delete Subject
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                  Are you sure you want to
                                                  delete &quot;
                                                  {subject.name}&quot;? This
                                                  action cannot be undone.
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                  Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                  onClick={() =>
                                                    console.log(
                                                      "Delete subject"
                                                    )
                                                  } // TODO: Implement delete subject action
                                                >
                                                  Delete
                                                </AlertDialogAction>
                                              </AlertDialogFooter>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </SlideDown>
                        </div>
                      );
                    })}
              </div>
              {/* Empty Placeholder */}
              {AFOS && AFOS.modules.length === 0 && (
                <div className="grid place-items-center text-muted-foreground h-[calc(100dvh-10rem)]">
                  No module added yet
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

// SlideDown transition component
function SlideDown({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");
  const [renderChildren, setRenderChildren] = useState(show);

  useEffect(() => {
    if (show) {
      setRenderChildren(true);
    }
  }, [show]);

  // Update height on show, children, or content resize
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function updateHeight() {
      if (!node) return;
      if (show) {
        setHeight(node.scrollHeight + "px");
      } else {
        setHeight("0px");
      }
    }

    updateHeight();

    // Use ResizeObserver to handle dynamic content
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, [show, children]);

  // After collapse animation, hide children for accessibility
  useEffect(() => {
    if (!show && ref.current) {
      const timeout = setTimeout(() => setRenderChildren(false), 300);
      return () => clearTimeout(timeout);
    }
    if (show) {
      setRenderChildren(true);
    }
  }, [show]);

  return (
    <div
      style={{
        maxHeight: height,
        transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
      aria-hidden={!show}
    >
      <div
        ref={ref}
        style={{
          visibility: show || renderChildren ? "visible" : "hidden",
          pointerEvents: show || renderChildren ? "auto" : "none",
        }}
      >
        {renderChildren ? children : null}
      </div>
    </div>
  );
}
